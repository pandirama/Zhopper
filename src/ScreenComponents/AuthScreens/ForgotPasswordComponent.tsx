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
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../utils/appStyles';
import {colors} from '../../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../../components/HeaderComponent';
import TextInputComponent from '../../components/TextInputComponent';
import {Ionicons, Zocial} from '../../utils/IconUtils';
import {useForgotPasswordMutation} from '../../api/auth/authAPI';
import useCommon from '../../hooks/useCommon';
import {getErrorMessage} from '../../utils/common';

const ForgotPasswordComponent = ({}: any) => {
  const {showToast, toggleBackdrop} = useCommon();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [forgotPassword, {isLoading}] = useForgotPasswordMutation();

  const fnameFieldRef = useRef<TextInput>();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const onForgotSubmit = async () => {
    if (userName === '' || email === '') {
      showToast({
        type: 'error',
        text1: 'Please Enter Required Fields',
      });
      return;
    }
    try {
      const params = {
        username: userName,
        email: email,
      };

      const response: any = await forgotPassword(params).unwrap();
      console.log('response', response);
      if (response[0]?.status === 1) {
        setPassword(response[0]?.data);
        showToast({
          type: 'success',
          text1: response[0]?.message,
        });
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
            placeHolder={'Enter Your User Name'}
            headText={'User Name'}
            onChangeValue={setUserName}
            value={userName}
            returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
            onSubmitEditing={() => fnameFieldRef.current?.focus()}
          />

          <TextInputComponent
            icon={
              <Zocial
                name="email"
                color={colors.icon}
                size={25}
                style={styles.icon}
              />
            }
            ref={fnameFieldRef}
            placeHolder={'Enter Your Email ID'}
            headText={'Email ID'}
            onChangeValue={setEmail}
            value={email}
            returnKeyType={'done'}
          />

          <TouchableOpacity onPress={onForgotSubmit}>
            <LinearGradient
              colors={['#853b92', '#4b0892']}
              style={styles.loginBtn}>
              <Text style={styles.loginBtnTxt}>SUBMIT NOW</Text>
            </LinearGradient>
          </TouchableOpacity>
          {password && (
            <View style={styles.passwordAnswerView}>
              <View style={styles.coloView} />
              <Text
                style={
                  styles.passwordAnswerTxt
                }>{`Your Password is ${password}`}</Text>
            </View>
          )}
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
  coloView: {
    width: 5,
    backgroundColor: '#ea6b2e',
  },
  passwordAnswerView: {
    margin: 20,
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 3,
  },
  passwordAnswerTxt: {
    paddingTop: 15,
    paddingBottom: 15,
    textAlign: 'center',
    fontSize: 15,
    flex: 1,
    fontFamily: fontFamily.poppins_extra_bold,
    color: '#2a1247',
  },
});

export default ForgotPasswordComponent;
