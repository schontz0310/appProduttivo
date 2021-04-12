import React, { useCallback } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import api from '../../services/api';
import {useAuth} from '../../hook/auth'

import {Container, Title} from './styles'
import { Button } from 'react-native';

interface ScannerDataProps{
  app_id: number;
  dev_id: number;
}

const Dashboard: React.FC = () => {

  const navigate = useNavigation();
  const route = useRoute();

  const {token} = useAuth();

  const params = route.params as ScannerDataProps;

  console.log(params.dev_id);

  console.log(api.defaults.headers.authorization)


  const createDevice = useCallback(async ()=>{
    const result = await api.put(`/application/${params.app_id}/device/${params.dev_id}/ttn`, {}, {
      headers: {
        Authorization: `Token ${token}`,
        password: 12345678,
      }
    });
    console.log(result.data);
  },[])


  return(
    <>
    <Container>
        <Title>Details</Title>
        <Title>{params.app_id}</Title>
        <Title>{params.dev_id}</Title>
        <Button title="voltar" onPress={()=> navigate.goBack()} />
        <Button title="cadastrar Device" onPress={createDevice} />
    </Container>
    </>
  )
}

export default Dashboard;
