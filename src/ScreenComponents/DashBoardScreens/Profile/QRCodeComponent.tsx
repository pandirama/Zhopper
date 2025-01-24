import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import QRScanner from './QRScanner';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';

const clr1 = 'mediumseagreen';

const QRCodeComponent = ({navigation}: any) => {
  const [qrCode, setQrCode] = useState('');

  const onQrRead = (qrtext: any) => {
    console.log('qrtext', qrtext);
    setQrCode(qrtext);
    console.log('qrCode', qrCode);
    navigation.goBack();
  };

  return (
    <>
      <DashBoardHeaderComponent title={'Profile'} />
      <View style={styles.page}>
        <QRScanner onRead={onQrRead} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  btn: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: '3%',
    width: '50%',
    borderWidth: 2,
    borderColor: clr1,
  },
  btnText: {
    color: clr1,
  },
});

export default QRCodeComponent;
