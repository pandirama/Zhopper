/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../utils/appStyles';
import {colors} from '../../utils/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../../components/HeaderComponent';
import TextInputComponent from '../../components/TextInputComponent';
import useCommon from '../../hooks/useCommon';
import {useChangePwdMutation} from '../../api/auth/authAPI';
import {getErrorMessage} from '../../utils/common';

const ForgotPasswordComponent = () => {
  const {showToast, toggleBackdrop} = useCommon();

  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [reTypePassword, setRetypePassword] = useState('');
  const [capcha, setCapcha] = useState('');

  const fnameFieldRef = useRef<TextInput>();
  const passFieldRef = useRef<TextInput>();
  const rePassFieldRef = useRef<TextInput>();

  const [changePwd, {isLoading}] = useChangePwdMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const onPasswordChange = async () => {
    if (fullName === '' || password === '' || reTypePassword === '') {
      showToast({
        type: 'error',
        text1: 'Please Enter Required Fields',
      });
      return;
    }
    if (password !== reTypePassword) {
      showToast({
        type: 'error',
        text1: 'Password and Retype Password are incorrect',
      });
      return;
    }
    try {
      const params = {
        userid: 10000,
        password: 'XXXXX',
      };

      const response: any = await changePwd(params).unwrap();
      console.log('response', response);
      if (response[0]?.status === 1) {
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
      <SafeAreaView style={appStyles.container}>
        <HeaderComponent
          title={'Forgot Password'}
          subTitle={'Reset Your Password'}
        />
        <ScrollView
          style={styles.loginFormView}
          showsVerticalScrollIndicator={false}>
          <Text style={appStyles.titleTxt}>Forgot Password Form</Text>
          <TextInputComponent
            icon={
              <Ionicons
                name="person"
                color={colors.icon}
                size={25}
                style={styles.icon}
              />
            }
            placeHolder={'Enter User Name or Email'}
            headText={'Name or Email'}
            onChangeValue={setFullName}
            value={fullName}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            onSubmitEditing={() => fnameFieldRef.current?.focus()}
          />
          <TextInputComponent
            icon={
              <Fontisto
                name="locked"
                color={colors.icon}
                size={25}
                style={styles.icon}
              />
            }
            ref={fnameFieldRef}
            placeHolder={'**************'}
            headText={'Password'}
            onChangeValue={setPassword}
            value={password}
            secureTextEntry={true}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            onSubmitEditing={() => passFieldRef.current?.focus()}
          />

          <TextInputComponent
            icon={
              <MaterialCommunityIcons
                name="lock-off"
                color={colors.icon}
                size={25}
                style={styles.icon}
              />
            }
            ref={passFieldRef}
            placeHolder={'**************'}
            headText={'Retype Password'}
            onChangeValue={setRetypePassword}
            value={reTypePassword}
            secureTextEntry={true}
            onSubmitEditing={() => rePassFieldRef.current?.focus()}
          />

          <TextInputComponent
            icon={
              <MaterialCommunityIcons
                name="dots-horizontal"
                color={colors.icon}
                size={25}
                style={styles.icon}
              />
            }
            ref={rePassFieldRef}
            placeHolder={'Enter Capcha'}
            headText={'Enter Capcha'}
            onChangeValue={setCapcha}
            value={capcha}
            returnKeyType={'done'}
          />

          <TouchableOpacity onPress={onPasswordChange}>
            <LinearGradient
              colors={['#853b92', '#4b0892']}
              style={styles.loginBtn}>
              <Text style={styles.loginBtnTxt}>SUBMIT NOW</Text>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  loginFormView: {
    marginLeft: 20,
    marginRight: 20,
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
  loginBtn: {
    height: 45,
    borderRadius: 30,
    width: 180,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  loginBtnTxt: {
    color: colors.white,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 700,
    fontFamily: fontFamily.poppins_bold,
  },
  signupView: {
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 10,
  },
  donttxt: {
    color: colors.black,
    fontSize: 16,
    textAlign: 'center',
  },
  signupTxt: {
    color: colors.inputBorder,
    fontSize: 16,
  },
});

export default ForgotPasswordComponent;
