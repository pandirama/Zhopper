/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
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
import useCommon from '../../hooks/useCommon';
import {useLoginMutation} from '../../api/auth/authAPI';
import {getErrorMessage, localStorageKey, setStorage} from '../../utils/common';
import {authAction} from '../../reducer/auth/authSlice';
import {useAppDispatch} from '../../store';
import {useSelector} from 'react-redux';
import {
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
} from '../../utils/IconUtils';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';

type Props = NativeStackScreenProps<any, 'LOGIN'>;

const LoginComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const {isRemembered, user} = useSelector(({authReducer}: any) => authReducer);

  const [accept, toggleAccept] = useState<boolean>(isRemembered ?? false);
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, togglePassword] = useState(true);

  const fnameFieldRef = useRef<TextInput>();

  const [login, {isLoading}] = useLoginMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  useEffect(() => {
    if (isRemembered) {
      setFullName(user?.username);
      setPassword(user?.password);
    }
  }, [isRemembered]);

  const onBtForgetPassword = () => {
    navigation.navigate('FORGOT_PASSWORD');
  };

  const onBtSignup = () => {
    navigation.navigate('REGISTER');
  };

  const onLoginSubmit = async () => {
    if (fullName === '' || password === '') {
      showToast({
        type: 'error',
        text1: 'Please Enter Required Fields',
      });
      return;
    }
    try {
      const params = {
        username: fullName,
        password: password,
      };

      const response: any = await login(params).unwrap();

      if (response[0]?.status === 1) {
        await setStorage(
          localStorageKey.userInfo,
          JSON.stringify(response[0]?.data),
        );
        dispatch(
          authAction.setIsRemembered({
            isRemembered: accept,
            user: params,
          }),
        );
        dispatch(authAction.setLogin(response[0].data));
        navigation.navigate('DASH_BOARD');
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
          <HeaderComponent
            title={'Welcome Back'}
            subTitle={'Login to Your Account'}
            screen
          />
          <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset={25}
            style={{flex: 1}}>
            <ScrollView>
              <View style={styles.loginFormView}>
                <Text style={appStyles.titleTxt}>Login Form</Text>
                <TextInputComponent
                  icon={
                    <Ionicons
                      name="person"
                      color={colors.icon}
                      size={25}
                      style={styles.icon}
                    />
                  }
                  placeHolder={'Enter Your Name'}
                  headText={'User Name'}
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
                  rightIcon={
                    <TouchableOpacity
                      style={styles.rightIcon}
                      onPress={() => togglePassword(p => !p)}>
                      <Ionicons
                        name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                        color={colors.icon}
                        size={20}
                      />
                    </TouchableOpacity>
                  }
                  ref={fnameFieldRef}
                  placeHolder={'**************'}
                  headText={'Password'}
                  onChangeValue={setPassword}
                  value={password}
                  secureTextEntry={showPassword}
                  returnKeyType={'done'}
                />
                <View style={styles.passwordView}>
                  <TouchableOpacity
                    onPress={() => toggleAccept(a => !a)}
                    style={styles.checkTouch}>
                    <MaterialCommunityIcons
                      name={
                        accept
                          ? 'check-circle'
                          : 'checkbox-blank-circle-outline'
                      }
                      size={24}
                      color={'#c14dbd'}
                    />

                    <Text style={styles.rememberTxt}>Remember me</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={onBtForgetPassword}
                    style={styles.passTouch}>
                    <Text style={styles.passwordTxt}>Forgot Password</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={onLoginSubmit}>
                  <LinearGradient
                    colors={['#853b92', '#4b0892']}
                    style={styles.loginBtn}>
                    <Text style={styles.loginBtnTxt}>LOGIN NOW</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.signupView}
                  onPress={onBtSignup}>
                  <Text style={styles.donttxt}>Don’t have an Acccount ?</Text>
                  <Text style={styles.signupTxt}>Signup</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
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
    marginLeft: 5,
  },
  rightIcon: {
    padding: 5,
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
    borderRadius: 30,
    marginTop: 40,
    width: 160,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loginBtnTxt: {
    color: colors.white,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 700,
    fontFamily: fontFamily.poppins_bold,
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
});

export default LoginComponent;
