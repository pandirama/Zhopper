/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';

type Props = NativeStackScreenProps<any, 'WALLET'>;

const WalletComponent = ({}: Props) => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.status}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent title={'Assets'} />
        <View
          style={{
            flexDirection: 'row',
            marginLeft: 12,
            marginRight: 12,
            marginTop: 30,
          }}>
          <View
            style={[
              appStyles.boxShadow,
              {
                flex: 1,
                backgroundColor: colors.white,
                borderRadius: 10,
                marginRight: 10,
                marginLeft: 10,
                paddingTop: 15,
                paddingLeft: 20,
                paddingBottom: 10,
              },
            ]}>
            <Fontisto name="wallet" color={'#4e0b92'} size={45} />
            <Text
              style={{
                color: '#951bb1',
                fontSize: 16,
                fontFamily: fontFamily.poppins_semi_bold,
                marginTop: 5,
              }}>
              SC Wallet
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: 18,
                fontFamily: fontFamily.poppins_semi_bold,
              }}>
              MYR 1,325.952
            </Text>
          </View>
          <View
            style={[
              appStyles.boxShadow,
              {
                flex: 1,
                backgroundColor: colors.white,
                borderRadius: 10,
                marginRight: 10,
                marginLeft: 10,
                paddingLeft: 20,
                paddingTop: 15,
                paddingBottom: 10,
              },
            ]}>
            <Image
              source={require('../../../assets/cb_wallet.png')}
              style={{width: 50, height: 50}}
            />
            <Text
              style={{
                color: '#951bb1',
                fontSize: 16,
                fontFamily: fontFamily.poppins_semi_bold,
                marginTop: 5,
              }}>
              CB Wallet
            </Text>
            <Text
              style={{
                color: colors.black,
                fontSize: 18,
                fontFamily: fontFamily.poppins_semi_bold,
              }}>
              $91.34
            </Text>
          </View>
        </View>
        <View
          style={{
            borderRadius: 15,
            padding: 10,
            marginTop: 60,
            marginLeft: 20,
            marginRight: 20,
            backgroundColor: '#f7f6f6',
          }}>
          <Text style={styles.titleTxt}>Recent Transaction</Text>
          <Text style={styles.subtitleTxt}>
            In dolor neque, commodo sit amet accumsan ac, sodales nec ex. D
          </Text>
          <View style={styles.walletContainer}>
            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <TouchableOpacity style={styles.walletTouch}>
                <Image
                  source={require('../../../assets/record_icon.png')}
                  style={{width: 50, height: 50}}
                />
                <Text style={styles.walletTitleTxt}>Spend Record</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={22}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.borderView} />
              <TouchableOpacity style={styles.walletTouch}>
                <Image
                  source={require('../../../assets/cb_wallet_icon.png')}
                  style={{width: 50, height: 50}}
                />
                <Text style={styles.walletTitleTxt}>Cash Back Wallet</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={22}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <View style={styles.borderView} />
              <TouchableOpacity style={styles.walletTouch}>
                <Image
                  source={require('../../../assets/redemption_icon.png')}
                  style={{width: 50, height: 50}}
                />
                <Text style={styles.walletTitleTxt}>Redemption</Text>
                <Ionicons
                  name={'chevron-forward'}
                  size={22}
                  color={colors.black}
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  loginFormView: {
    marginLeft: 20,
    marginRight: 20,
  },
  inputView: {
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    marginTop: 40,
  },
  icon: {
    marginRight: 10,
  },
  inputHeadTxt: {
    position: 'absolute',
    top: -15,
    left: 15,
    backgroundColor: colors.background,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    paddingTop: 2,
    color: colors.inputBorder,
    fontSize: 16,
    fontFamily: fontFamily.poppins_semi_bold,
  },
  input: {
    paddingLeft: 12,
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    flex: 1,
  },
  passwordView: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 5,
    marginRight: 10,
  },
  rememberTxt: {
    color: '#907ca2',
    fontSize: 16,
    marginLeft: 5,
    fontFamily: fontFamily.poppins_regular,
  },
  passwordTxt: {
    color: '#3e175f',
    fontSize: 16,
    textAlign: 'right',
    fontFamily: fontFamily.poppins_semi_bold,
  },
  loginBtn: {
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    width: 160,
    alignSelf: 'center',
    marginTop: 40,
  },
  loginBtnTxt: {
    color: colors.white,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: fontFamily.poppins_semi_bold,
  },
  signupView: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  donttxt: {
    color: colors.black,
    fontSize: 14,
    textAlign: 'center',
    fontFamily: fontFamily.poppins_medium,
  },
  signupTxt: {
    color: colors.inputBorder,
    fontSize: 14,
    fontFamily: fontFamily.poppins_semi_bold,
  },
  checkTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passTouch: {
    flex: 1,
  },
  titleTxt: {
    fontSize: 20,
    color: '#000000',
    fontFamily: fontFamily.poppins_semi_bold,
  },
  subtitleTxt: {
    fontSize: 14,
    color: '#8c8b8b',
    fontFamily: fontFamily.poppins_medium,
  },
  walletContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 10,
    paddingLeft: 0,
  },
  walletTitleTxt: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 10,
    fontFamily: fontFamily.poppins_semi_bold,
  },
});

export default WalletComponent;
