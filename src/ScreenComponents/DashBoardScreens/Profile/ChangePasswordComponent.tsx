/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
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
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {useChangePwdMutation} from '../../../api/profileAPI';
import {useSelector} from 'react-redux';

const ChangePasswordComponent = ({navigation}: any) => {
  const {showToast, toggleBackdrop} = useCommon();

  const {userProfile} = useSelector(({profileReducer}: any) => profileReducer);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const newFieldRef = useRef<TextInput>();

  const [changePwd, {isLoading}] = useChangePwdMutation();

  const {userInfo} = useSelector(({authReducer}: any) => authReducer);

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const onPasswordChange = async () => {
    if (newPassword === '' || confirmPassword === '') {
      showToast({
        type: 'error',
        text1: 'Please Enter Required Fields',
      });
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast({
        type: 'error',
        text1: 'Password and Retype Password are incorrect',
      });
      return;
    }
    try {
      const params = {
        userid: userInfo[0]?.userid,
        password: newPassword,
      };

      const response: any = await changePwd(params).unwrap();
      if (response[0]?.status === 1) {
        showToast({
          type: 'success',
          text1: response[0]?.message,
        });
        setTimeout(() => {
          navigation.goBack();
        }, 1000);
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
          <DashBoardHeaderComponent title={'Profile'} back />
          <ScrollView showsVerticalScrollIndicator={false}>
            <LinearGradient
              colors={['#9b6ec6', '#b386dc', '#c79bef']}
              style={styles.container}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginLeft: 15,
                  marginBottom: 20,
                  marginTop: 20,
                }}>
                <Image
                  source={require('../../../assets/profile_user.png')}
                  style={{width: 60, height: 60}}
                />
                <View
                  style={{marginLeft: 10, justifyContent: 'center', flex: 1}}>
                  <Text
                    style={{
                      color: '#310855',
                      fontSize: 16,
                      fontFamily: fontFamily.poppins_semi_bold,
                    }}>
                    {userProfile?.fullname}
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
            </LinearGradient>
            <View style={styles.loginFormView}>
              <View
                style={{
                  backgroundColor: '#f7f6f6',
                  borderRadius: 10,
                  padding: 10,
                  marginTop: 30,
                }}>
                <Text style={styles.titleTxt}>Update Password</Text>
                <Text style={styles.subtitleTxt}>Change Your Password</Text>
                <TextInputComponent
                  placeHolder={'Enter Your New Password'}
                  headText={'New Password'}
                  onChangeValue={setNewPassword}
                  value={newPassword}
                  secureTextEntry={true}
                  returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                  onSubmitEditing={() => newFieldRef.current?.focus()}
                />
                <TextInputComponent
                  ref={newFieldRef}
                  placeHolder={'Enter Your Confirm Password'}
                  headText={'Confirm Password'}
                  onChangeValue={setConfirmPassword}
                  value={confirmPassword}
                  secureTextEntry={true}
                  returnKeyType={'done'}
                />

                <TouchableOpacity onPress={onPasswordChange}>
                  <LinearGradient
                    colors={['#853b92', '#4b0892']}
                    style={styles.loginBtn}>
                    <Text style={styles.loginBtnTxt}>SUBMIT</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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

export default ChangePasswordComponent;
