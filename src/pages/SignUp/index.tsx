/* eslint-disable object-curly-newline */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Alert,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup'

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getvalidationErros'

import {
  Container,
  Title,
  BackgroundImage,
  CreateAcountButton,
  CreateAcountButtonText,
} from './styles';

import backgroundImage from '../../assets/backgroundImage.png';
import logoImg from '../../assets/logo.png';

interface SignUpFormData{
  name: string
  email: string
  password: string
}

const SigUp: React.FC = () => {
  const inputEmailRef = useRef<TextInput>(null)
  const inputPasswordRef = useRef<TextInput>(null)
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();
  const [showSignInButton, setShowSignInButton] = useState(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setShowSignInButton(false); // or some other action
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setShowSignInButton(true); // or some other action
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      console.log(data)
      try {
        formRef.current?.setErrors({});
        const schemaValidation = Yup.object().shape({
          name: Yup.string().required('Nome Obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'minimo de 6 dígitos'),
        });
        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        /*await api.post('/users', data);
        Alert.alert(
          'Cadastro realizado!',
          'Você já pode fazer login no GoBarber!',
        );*/

        Alert.alert(
          'Solicitação realizada com sucesso',
          `${data.name}, assim que realizarmos seu cadastro voce recebera suas credencias no seguinte email ${data.email}`,
        );

        navigation.navigate('SignIn');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          console.log('deu erro')
          return;
        }
        // disparar um toast
        Alert.alert(
          'Erro no Cadastro',
          'Ocorreu um erro ao cadastrar novo usuario, cheque os campos',
        );
      }
    },
    [navigation],
  );



  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >
          {/*<BackgroundImage
            source={backgroundImage}
            imageStyle={{
              left: 15,
              top: -20,
              width: 370,
              height: 550,
            }}
          />*/}
          <Container>
            <Image source={logoImg} />
            <Title>Cadastro</Title>
            <Form
              ref={formRef}
              onSubmit={handleSignUp}
            >
              <Input
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={()=>{
                  inputEmailRef.current?.focus()
                }}
              />
              <Input
                ref={inputEmailRef}
                textContentType="none"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                autoCompleteType="off"
                name="email"
                icon="mail"
                placeholder="E-mail"
                returnKeyType="next"
                onSubmitEditing={()=>{
                  inputPasswordRef.current?.focus()
                }}
              />
              <Input
                ref={inputPasswordRef}
                textContentType="newPassword"
                name="password"
                icon="lock"
                placeholder="Senha"
                returnKeyType="send"
                secureTextEntry
                onSubmitEditing={()=>{
                  formRef.current?.submitForm()
                }}

              />

              <Button
                onPress={() => {
                  formRef.current?.submitForm();

                }}
              >
                Solcitar
              </Button>
            </Form>
          </Container>
        </KeyboardAvoidingView>

        {showSignInButton && (
          <CreateAcountButton
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Icon size={20} name="arrow-left" color="#636363" />
            <CreateAcountButtonText>Voltar</CreateAcountButtonText>
          </CreateAcountButton>
        )}
      </SafeAreaView>
    </>
  );
};

export default SigUp;
