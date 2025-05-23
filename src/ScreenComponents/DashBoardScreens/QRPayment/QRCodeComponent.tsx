import React from 'react';
import {View, StyleSheet} from 'react-native';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import QRScanner from './QRScanner';
import appStyles from '../../../utils/appStyles';
import {SafeAreaView} from 'react-native-safe-area-context';

const clr1 = 'mediumseagreen';

const QRCodeComponent = ({navigation, route}: any) => {
  const {wallet} = route?.params ?? {};

  const onQrRead = (qrtext: any) => {
    if (qrtext) {
      navigation.navigate('PAYMENT', {
        wallet,
        merchantID: qrtext,
      });
    } else {
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={appStyles.container} edges={['right', 'left', 'top']}>
      <View style={appStyles.headerContainer}>
        <DashBoardHeaderComponent back />
        <View style={styles.page}>
          <QRScanner onRead={onQrRead} />
        </View>
      </View>
    </SafeAreaView>
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
