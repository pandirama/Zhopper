/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import TextInputComponent from '../../../components/TextInputComponent';
import LinearGradient from 'react-native-linear-gradient';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {useSelector} from 'react-redux';
import Success from '../../../assets/success.svg';
import Failed from '../../../assets/failed.svg';
import {
  useMerchantInfoMutation,
  useQRPaymentMutation,
} from '../../../api/walletAPI';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const windowWidth = Dimensions.get('window').width;

const PaymentComponent = ({route}: any) => {
  const {t} = useTranslation();
  const {wallet = {}, merchantID = ''} = route?.params ?? {};
  const {showToast, toggleBackdrop} = useCommon();

  const [amount, setAmount] = useState('');
  const [succeed, setSucceed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [merchantInfos, setMerchantInfos] = useState<any>(null);

  const [QRPayment, {isLoading}] = useQRPaymentMutation();

  const [merchantInfo, {isLoading: isInfoLoading}] = useMerchantInfoMutation();

  const {userInfo} = useSelector(({authReducer}: any) => authReducer);

  useEffect(() => {
    toggleBackdrop(isLoading || isInfoLoading);
  }, [isLoading || isInfoLoading]);

  const getMerchantInfo = async () => {
    try {
      const params = {
        userid: merchantID,
      };
      const response: any = await merchantInfo(params).unwrap();
      if (response[0]?.status === 1) {
        showToast({
          type: 'success',
          text1: response[0]?.message,
        });
        setMerchantInfos(response[0]?.data[0]);
      } else {
        showToast({
          type: 'error',
          text1: response[0]?.message,
        });
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      getMerchantInfo();
      return () => {};
    }, []),
  );

  const onPayment = async () => {
    try {
      const params = {
        merchant_id: merchantID,
        buyer_id: userInfo[0]?.userid,
        amount: amount,
        gateway: wallet?.wallet,
        currency: wallet?.currency,
        transactionid: `OF${Math.floor(100000 + Math.random() * 900000)}`,
      };
      const response: any = await QRPayment(params).unwrap();
      if (response[0]?.status === 1) {
        showToast({
          type: 'success',
          text1: response[0]?.message,
        });
        setSucceed(true);
      } else {
        showToast({
          type: 'error',
          text1: response[0]?.message,
        });
        setFailed(true);
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.status}
        animated
      />
      <SafeAreaView
        style={appStyles.container}
        edges={['right', 'left', 'top']}>
        <View style={appStyles.headerContainer}>
          <DashBoardHeaderComponent title={t('PAYMENT')} back />
          {succeed && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              }}>
              <Success style={{alignSelf: 'center'}} />
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  bottom: 60,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 25,
                    textAlign: 'center',
                    width: windowWidth / 1.3,
                    fontFamily: fontFamily.poppins_bold,
                  }}>
                  {t('PAYMENT_SUCCESSFUL')}
                </Text>
                <Text
                  style={{
                    color: '#83c8a4',
                    fontSize: 12,
                    marginTop: 5,
                    textAlign: 'center',
                    width: windowWidth / 1.3,
                    fontFamily: fontFamily.poppins_medium,
                  }}>
                  {t('CONGRATS_PAYMENT_SUCCESSFUL')}
                </Text>
              </View>
            </View>
          )}

          {failed && (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 50,
              }}>
              <Failed style={{alignSelf: 'center'}} />
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'center',
                  bottom: 60,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 25,
                    textAlign: 'center',
                    width: windowWidth / 1.3,
                    fontFamily: fontFamily.poppins_bold,
                  }}>
                  Payment Declined
                </Text>
                <Text
                  style={{
                    color: '#83c8a4',
                    fontSize: 12,
                    marginTop: 5,
                    textAlign: 'center',
                    width: windowWidth / 1.3,
                    fontFamily: fontFamily.poppins_medium,
                  }}>
                  Sorry, Your Payment has failed
                </Text>
              </View>
            </View>
          )}

          {!succeed && !failed && (
            <View
              style={{
                marginLeft: 30,
                marginRight: 30,
                justifyContent: 'center',
                flex: 1,
              }}>
              <View
                style={{
                  marginTop: 20,
                }}>
                <LinearGradient
                  colors={['#853b92', '#4b0892']}
                  style={{
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                  }}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 18,
                      marginTop: 10,
                      fontFamily: fontFamily.poppins_bold,
                      marginLeft: 10,
                    }}>
                    {t('MAKE_YOUR_PAYMENT')}
                  </Text>
                  <Text
                    style={{
                      color: '#b691c1',
                      fontSize: 12,
                      fontFamily: fontFamily.poppins_medium,
                      marginBottom: 10,
                      marginLeft: 10,
                    }}>
                    {t('SIMPLE_WAY_TO_MAKE_PAYMENT')}
                  </Text>
                </LinearGradient>
              </View>
              <View style={styles.loginFormView}>
                <View
                  style={{
                    backgroundColor: colors.white,
                    padding: 10,
                    borderBottomLeftRadius: 25,
                    borderBottomRightRadius: 25,
                  }}>
                  <Text style={styles.titleTxt}>
                    {merchantInfos?.['Merchant Name']}
                  </Text>
                  <Text style={styles.subtitleTxt}>({merchantID})</Text>
                  <TextInputComponent
                    headText={t('AMOUNT')}
                    onChangeValue={setAmount}
                    value={amount}
                    inputStyle={{backgroundColor: colors.white}}
                    returnKeyType={'done'}
                    textInputStyle={{paddingLeft: 3}}
                    icon={
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: 500,
                          color: colors.black,
                        }}>
                        {`${merchantInfos?.currency} : `}
                      </Text>
                    }
                  />
                  <TouchableOpacity onPress={onPayment}>
                    <LinearGradient
                      colors={['#853b92', '#4b0892']}
                      style={styles.loginBtn}>
                      <Text style={styles.loginBtnTxt}>
                        {t('MAKE_PAYMENT')}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepIndicator: {
    width: 10,
    height: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ae82bf',
    backgroundColor: '#ae82bf',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeStep: {
    borderColor: '#853b92',
    backgroundColor: '#853b92',
  },
  stepText: {
    color: '#9c91a6',
    fontSize: 13,
    fontFamily: fontFamily.poppins_semi_bold,
    position: 'absolute',
  },
  activeStepText: {
    color: '#853b92',
  },
  line: {
    width: 38,
    height: 2,
    backgroundColor: colors.white,
  },
  activeLine: {
    backgroundColor: '#853b92',
  },
  container: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  loginFormView: {
    marginBottom: 20,
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
    marginLeft: 5,
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
    marginLeft: 10,
    marginRight: 10,
  },
  rememberTxt: {
    flex: 1,
    color: '#907ca2',
    fontSize: 16,
  },
  passwordTxt: {
    color: '#3e175f',
    fontSize: 16,
  },
  tabBtn: {
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    width: 160,
    alignSelf: 'center',
  },
  tabTxt: {
    color: colors.white,
    fontSize: 16,
    textAlign: 'center',
    fontFamily: fontFamily.poppins_semi_bold,
  },
  loginBtn: {
    height: 45,
    borderRadius: 30,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 30,
  },
  pwdBtn: {
    height: 40,
    borderRadius: 30,
    width: 220,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  loginBtnTxt: {
    color: colors.white,
    fontSize: 18,
    fontWeight: 700,
    textAlign: 'center',
    fontFamily: fontFamily.poppins_semi_bold,
  },
  signupView: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 5,
  },
  donttxt: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
    marginLeft: 5,
  },
  signupTxt: {
    color: colors.inputBorder,
    fontSize: 16,
  },
  checkTouch: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropDownView: {
    borderWidth: 1.5,
    borderColor: colors.inputBorder,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 20,
    marginTop: 40,
    height: 60,
  },
  dropDown: {
    flex: 1,
    marginLeft: 15,
    marginRight: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    fontFamily: fontFamily.poppins_medium,
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: fontFamily.poppins_medium,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 10,
  },
  dropcontainerStyle: {
    borderRadius: 10,
    padding: 5,
  },
  titleTxt: {
    fontSize: 22,
    color: colors.black,
    fontFamily: fontFamily.poppins_extra_bold,
    textAlign: 'center',
    marginTop: 20,
  },
  subtitleTxt: {
    fontSize: 15,
    color: '#310855',
    fontFamily: fontFamily.poppins_bold,
    textAlign: 'center',
    marginBottom: 5,
  },
  logout: {
    height: 40,
    width: 40,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 50,
    top: 10,
    backgroundColor: '#4c0992',
  },
});

export default PaymentComponent;
