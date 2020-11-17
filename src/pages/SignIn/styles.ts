import styled from 'styled-components/native';

export const BackgroundImage = styled.ImageBackground`
  position: absolute;
`;

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`;

export const Title = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #ffffff;
  align-self: center;
  margin-bottom: 30px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 16px;
`;

export const ForgotPasswordText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #3333;
`;

export const CreateAcountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0px;
  right: 0;
  padding: 16px 0;

  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const CreateAcountButtonText = styled.Text`
  margin-left: 8px;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  color: #3333;
`;
