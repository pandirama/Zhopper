/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import TextInputComponent from '../../../components/TextInputComponent';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {
  useGetReferralQRQuery,
  useLazyGetProfileQuery,
} from '../../../api/profileAPI';
import {useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';

const ProfileComponent = ({navigation}: any) => {
  const {showToast, toggleBackdrop} = useCommon();
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [userName, setUserName] = useState('');
  const [shopperRank, setShopperRank] = useState(0);

  const {referralLink, userProfile} = useSelector(({profileReducer}: any) => profileReducer);

  console.log('referralLink', referralLink);
  console.log('userProfile', userProfile);

  const fullNameFieldRef = useRef<TextInput>();
  const emailFieldRef = useRef<TextInput>();
  const countryFieldRef = useRef<TextInput>();
  const userNameFieldRef = useRef<TextInput>();
  const shopperRankFieldRef = useRef<TextInput>();

  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const totalPackages = ['Bronze', 'Silver', 'Gold', 'Platinum'];

  useEffect(() => {
    if (userProfile) {
      setFullName(userProfile?.fullname);
      setEmail(userProfile?.email);
      setCountry(userProfile?.country);
      setUserName(userProfile?.username);
      setShopperRank(userProfile?.shopper_rank?.toString());
    }
  }, [userProfile]);


  // const handleNext = () => {
  //   setStep(prevStep => Math.min(prevStep + 1, totalSteps));
  // };

  // const handlePrevious = () => {
  //   setStep(prevStep => Math.max(prevStep - 1, 1));
  // };

  const renderStepIndicator = () => {
    const indicators = [];
    for (let i = 1; i <= totalSteps; i++) {
      indicators.push(
        <View>
          {i % 2 !== 0 && (
            <Text
              style={[
                styles.stepText,
                i <= step && styles.activeStepText,
                {top: -20, left: 25},
              ]}>
              {totalPackages[i - 1]}
            </Text>
          )}
          <View key={i} style={styles.stepContainer}>
            <View style={[styles.line, i <= step && styles.activeLine]} />
            <View
              style={[styles.stepIndicator, i <= step && styles.activeStep]}
            />
            {step === totalSteps ? (
              <View style={[styles.line, styles.activeLine]} />
            ) : (
              <View style={[styles.line, i < step && styles.activeLine]} />
            )}
          </View>
          {i % 2 === 0 && (
            <Text
              style={[
                styles.stepText,
                i <= step && styles.activeStepText,
                {top: 10, left: 20},
              ]}>
              {totalPackages[i - 1]}
            </Text>
          )}
        </View>,
      );
    }

    return <View style={styles.indicatorContainer}>{indicators}</View>;
  };

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.status}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent title={'Profile'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <LinearGradient
            colors={['#9b6ec6', '#b386dc', '#c79bef']}
            style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 15,
              }}>
              <Image
                source={require('../../../assets/profile_user.png')}
                style={{width: 60, height: 60}}
              />
              <View style={{marginLeft: 10, justifyContent: 'center', flex: 1}}>
                <Text
                  style={{
                    color: '#310855',
                    fontSize: 16,
                    fontFamily: fontFamily.poppins_semi_bold,
                  }}>
                  {fullname}
                </Text>
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 14,
                    fontFamily: fontFamily.poppins_regular,
                  }}>
                  Package
                </Text>
              </View>
              <View style={{marginRight: 15}}>
                <Image
                  source={require('../../../assets/arrow_right.png')}
                  style={{width: 60, height: 60}}
                />
                <Text
                  style={{
                    color: colors.black,
                    fontSize: 16,
                    fontFamily: fontFamily.poppins_semi_bold,
                    position: 'absolute',
                    right: 22,
                    top: 16,
                  }}>
                  Pts
                </Text>
                <View style={styles.logout}>
                  <Text
                    style={{
                      color: colors.white,
                      fontSize: 16,
                      fontFamily: fontFamily.poppins_semi_bold,
                    }}>
                    180
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#e2d2f0',
                marginTop: 10,
                height: 80,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 15,
                marginRight: 15,
              }}>
              {renderStepIndicator()}
            </View>
          </LinearGradient>
          <View style={styles.loginFormView}>
            <View
              style={{
                marginTop: 20,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: colors.white,
              }}>
              <LinearGradient
                colors={['#853b92', '#4b0892']}
                style={{
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.white,
                    fontSize: 18,
                    marginTop: 15,
                    fontFamily: fontFamily.poppins_bold,
                  }}>
                  My Referral QR Code
                </Text>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#b691c1',
                    fontSize: 12,
                    fontFamily: fontFamily.poppins_medium,
                    marginBottom: 15,
                  }}>
                  Share with your friend, register free account !
                </Text>
              </LinearGradient>
              <View style={{flexDirection: 'row', margin: 20}}>
                <View style={{flex: 0.7}}>
                  <View
                    style={{
                      backgroundColor: '#ebdcf9',
                      padding: 10,
                      width: 120,
                      height: 120,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <QRCode value={referralLink} />
                  </View>
                </View>

                <View style={{flex: 1}}>
                  <Text>
                    Lorem ipsum dolor sit amet, cons in auctor lacus. Quisque
                    sed t
                  </Text>
                  <TouchableOpacity
                    style={{marginTop: 15}}
                    onPress={() => navigation.navigate('QRCODE')}>
                    <LinearGradient
                      colors={['#853b92', '#4b0892']}
                      style={styles.tabBtn}>
                      <Text style={styles.tabTxt}>TAP AND SCAN</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#f7f6f6',
                borderRadius: 10,
                padding: 10,
                marginTop: 30,
              }}>
              <Text style={styles.titleTxt}>Basic Info</Text>
              <Text style={styles.subtitleTxt}>Basic details about you</Text>
              <TextInputComponent
                placeHolder={'Enter Your FullName'}
                headText={'Full Name'}
                onChangeValue={setFullName}
                value={fullname}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onSubmitEditing={() => fullNameFieldRef.current?.focus()}
              />
              <TextInputComponent
                ref={fullNameFieldRef}
                placeHolder={'Enter Your Email'}
                headText={'Email'}
                onChangeValue={setEmail}
                value={email}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onSubmitEditing={() => emailFieldRef.current?.focus()}
              />
              <TextInputComponent
                ref={emailFieldRef}
                placeHolder={'Enter Your Country'}
                headText={'Country'}
                onChangeValue={setCountry}
                value={country}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onSubmitEditing={() => countryFieldRef.current?.focus()}
              />

              <TextInputComponent
                placeHolder={'Enter Your User Name'}
                headText={'user Name'}
                onChangeValue={setUserName}
                value={userName}
                ref={countryFieldRef}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onSubmitEditing={() => userNameFieldRef.current?.focus()}
              />

              <TextInputComponent
                ref={userNameFieldRef}
                placeHolder={'Enter Your Shopper Rank'}
                headText={'Shopper Rank'}
                onChangeValue={setShopperRank}
                value={shopperRank}
                editable={false}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'done'}
                onSubmitEditing={() => shopperRankFieldRef.current?.focus()}
              />

              <TouchableOpacity>
                <LinearGradient
                  colors={['#853b92', '#4b0892']}
                  style={styles.loginBtn}>
                  <Text style={styles.loginBtnTxt}>SUBMIT</Text>
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('CHANGE_PWD')}>
                <LinearGradient
                  colors={['#853b92', '#4b0892']}
                  style={styles.pwdBtn}>
                  <Text style={styles.loginBtnTxt}>Change Password</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
    height: 180,
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  loginFormView: {
    marginLeft: 15,
    marginRight: 15,
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
    height: 40,
    borderRadius: 30,
    width: 160,
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
    fontSize: 17,
    color: '#310855',
    fontFamily: fontFamily.poppins_bold,
  },
  subtitleTxt: {
    fontSize: 12,
    color: '#8c8b8b',
    fontFamily: fontFamily.poppins_medium,
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

export default ProfileComponent;
