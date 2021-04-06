import React from 'react';

import {Container, Title} from './styles'

import {useAuth} from '../../hook/auth'

import api from '../../services/api'
import { Button } from 'react-native';

const Dashboard: React.FC = () => {

  const {user, signOut} = useAuth();

  return(
    <>
    <Container>
        <Title>Dashboard</Title>
        <Title>{api.defaults.headers.authorization}</Title>
        <Title>{"id = " + user.id}</Title>
        <Title>{"nome = " + user.name}</Title>
        <Title>{"email = " + user.email}</Title>
        <Title>{"avatar = " + user.avatar_url}</Title>
        <Button onPress={signOut} title='Sair' ></Button>
    </Container>
    </>
  )
}

export default Dashboard;
