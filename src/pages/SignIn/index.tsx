/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable object-curly-newline */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import {useAuth} from '../../hook/auth'

import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import Input from '../../components/Input';
import Button from '../../components/Button';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getvalidationErros';

import {
  Container,
  Title,
  BackgroundImage,
  ForgotPassword,
  ForgotPasswordText,
  CreateAcountButton,
  CreateAcountButtonText,
} from './styles';

import backgroundImage from '../../assets/backgroundImage.png';
import logoImg from '../../assets/logo.png';

interface SignUpForData {
  email: string;
  password: string;
}

const SigIn: React.FC = () => {
  const passwordInputRef = useRef<TextInput>(null);
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const {signIn, user} = useAuth();

  console.log(user);

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

  const handleSignIn = useCallback(
    async (data: SignUpForData) => {
      try {
        formRef.current?.setErrors({});

        const schemaValidation = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().min(6, 'minimo de 6 dígitos'),
        });
        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });

      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          console.log(errors)
          formRef.current?.setErrors(errors);
          return;
        }
        // disparar um toast
        console.log(err);
        Alert.alert(
          'Erro no Cadastro',
          'Ocorreu um erro ao logar na aplicação, cheque os campos',
        );
      }
    },
    [signIn],
  );

  return (
    <>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          enabled
        >


          <ScrollView
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ flex: 1 }}
          >
            {/*
            <BackgroundImage
            source={backgroundImage}
            imageStyle={{
              left: 15,
              top: -20,
              width: 370,
              height: 550,
            }}
          /> */}

            <Container>
              <Image source={logoImg} />
              <Title>Faça seu login</Title>
              <Form ref={formRef} onSubmit={handleSignIn}>
                <Input
                  name="email"
                  icon="mail"
                  placeholder="E-mail"
                  autoCorrect={false}
                  autoCapitalize="none"
                  autoCompleteType="off"
                  keyboardType="email-address"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    passwordInputRef.current?.focus();
                  }}
                />
                <Input
                  ref={passwordInputRef}
                  name="password"
                  icon="lock"
                  placeholder="Senha"
                  secureTextEntry
                  returnKeyType="send"
                  onSubmitEditing={() => {
                    formRef.current?.submitForm();
                  }}
                />

                <Button
                  onPress={() => {
                    formRef.current?.submitForm();
                  }}
                >
                  Entrar
                </Button>
              </Form>
              {showSignInButton && (
                <ForgotPassword
                  onPress={() => {
                    console.log('esqueci a senha');
                  }}
                >
                  <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                </ForgotPassword>
              )}
            </Container>
          </ScrollView>
        </KeyboardAvoidingView>

        {showSignInButton && (
          <CreateAcountButton
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          >
            <Icon size={20} name="log-in" color="#636363" />
            <CreateAcountButtonText>Solictar Cadastro</CreateAcountButtonText>
          </CreateAcountButton>
        )}
    </>
  );
};

export default SigIn;

