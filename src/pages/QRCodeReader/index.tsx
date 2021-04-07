import React, { useCallback } from 'react';
import {BarCodeReadEvent, RNCamera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';

import {UpperSection, LowerSection} from './styles'
import { View, TextInput, Vibration } from 'react-native';
import { Container } from '../Dashboard/styles';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';



const Dashboard: React.FC = () => {

  const showData = useCallback((scanned: BarCodeReadEvent)=>{
    Vibration.vibrate(300);
    console.log(scanned.data);
  },[])
  return(
    <>
      <Container>
        <RNCamera
          onBarCodeRead={(data)=>showData(data)}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}

        >
          <BarcodeMask
          width={300} height={300} showAnimatedLine={false} outerMaskOpacity={0.8}
          />
        </RNCamera>
      </Container>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width:'120%'

  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default Dashboard;
function data(data: any): ((event: import("react-native-camera").BarCodeReadEvent) => void) | undefined {
  throw new Error('Function not implemented.');
}

