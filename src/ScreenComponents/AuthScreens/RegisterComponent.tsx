/* eslint-disable react-native/no-inline-styles */
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
import {Dropdown} from 'react-native-element-dropdown';
import appStyles, {fontFamily} from '../../utils/appStyles';
import {colors} from '../../utils/colors';

import LinearGradient from 'react-native-linear-gradient';
import HeaderComponent from '../../components/HeaderComponent';
import TextInputComponent from '../../components/TextInputComponent';
import {useRegisterMutation} from '../../api/auth/authAPI';
import {getErrorMessage} from '../../utils/common';
import useCommon from '../../hooks/useCommon';
import {
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialCommunityIcons,
  Zocial,
} from '../../utils/IconUtils';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';

export const countries = [
  {
    label: 'Singapore',
    value: 'Singapore',
  },
  {
    label: 'Philippines',
    value: 'Philippines',
  },
  {
    label: 'Malaysia',
    value: 'Malaysia',
  },
];

const RegisterComponent = ({navigation}: any) => {
  const {showToast, toggleBackdrop} = useCommon();

  const [userName, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [referralName, setReferralName] = useState('');
  const [country, setCountry] = useState('');
  const [accept, toggleAccept] = useState(false);
  const [showPassword, togglePassword] = useState(true);

  const [isFocus, setIsFocus] = useState<boolean>(false);

  const unameFieldRef = useRef<TextInput>();
  const fnameFieldRef = useRef<TextInput>();
  const emailFieldRef = useRef<TextInput>();
  const passFieldRef = useRef<TextInput>();

  const [register, {isLoading}] = useRegisterMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const registerSubmit = async () => {
    if (
      userName === '' ||
      password === '' ||
      fullName === '' ||
      email === '' ||
      referralName === '' ||
      country === ''
    ) {
      showToast({
        type: 'error',
        text1: 'Please Enter Required Fields',
      });
      return;
    }
    if (!accept) {
      showToast({
        type: 'error',
        text1: 'Please Accept Terms and Condition',
      });
      return;
    }
    try {
      const params = {
        username: userName,
        password: password,
        fullname: fullName,
        email: email,
        directname: referralName,
        country: country,
      };

      const response: any = await register(params).unwrap();
      if (response[0]?.status === 1) {
        showToast({
          type: 'success',
          text1: response[0]?.message,
        });
        navigation.navigate('LOGIN');
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
            title={'Join With Us'}
            subTitle={'Register Your Account'}
          />
          <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset={25}
            style={{flex: 1}}>
            <ScrollView
              style={styles.loginFormView}
              showsVerticalScrollIndicator={false}>
              <Text style={appStyles.titleTxt}>Register Form</Text>
              <TextInputComponent
                icon={
                  <FontAwesome5
                    name="user-alt"
                    color={colors.icon}
                    size={24}
                    style={styles.icon}
                  />
                }
                placeHolder={'Enter Your User Name'}
                headText={'User Name'}
                onChangeValue={setUserName}
                value={userName}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onSubmitEditing={() => unameFieldRef.current?.focus()}
              />
              <TextInputComponent
                icon={
                  <Ionicons
                    name="person"
                    color={colors.icon}
                    size={25}
                    style={styles.icon}
                  />
                }
                ref={unameFieldRef}
                placeHolder={'Enter Your Full Name'}
                headText={'Full Name'}
                onChangeValue={setFullName}
                value={fullName}
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
                placeHolder={'Enter Your Email'}
                headText={'Email ID'}
                onChangeValue={setEmail}
                value={email}
                ref={fnameFieldRef}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onSubmitEditing={() => emailFieldRef.current?.focus()}
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
                    onPress={() => togglePassword(p => !p)}
                    style={styles.rightIcon}>
                    <Ionicons
                      name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                      color={colors.icon}
                      size={20}
                    />
                  </TouchableOpacity>
                }
                ref={emailFieldRef}
                placeHolder={'**************'}
                headText={'Password'}
                onChangeValue={setPassword}
                value={password}
                secureTextEntry={showPassword}
                returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                onSubmitEditing={() => passFieldRef.current?.focus()}
              />

              <TextInputComponent
                icon={
                  <FontAwesome5
                    name="users"
                    color={colors.icon}
                    size={22}
                    style={styles.icon}
                  />
                }
                ref={passFieldRef}
                placeHolder={'Enter Your Referral Name'}
                headText={'Referral Name'}
                onChangeValue={setReferralName}
                value={referralName}
                returnKeyType={'done'}
              />

              <View style={styles.dropDownView}>
                <FontAwesome5
                  name="globe"
                  color={colors.icon}
                  size={25}
                  style={styles.icon}
                />
                <Dropdown
                  dropdownPosition="bottom"
                  style={[
                    styles.dropDown,
                    isFocus && {borderColor: colors.primary},
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  containerStyle={styles.dropcontainerStyle}
                  data={countries}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus ? 'Select Country' : ''}
                  value={country}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item: any) => {
                    setCountry(item?.value);
                    setIsFocus(false);
                  }}
                  search={false}
                />
                <Text style={styles.inputHeadTxt}>Country</Text>
              </View>

              <View style={styles.signupView}>
                <TouchableOpacity
                  onPress={() => toggleAccept(a => !a)}
                  style={styles.checkTouch}>
                  <MaterialCommunityIcons
                    name={
                      accept ? 'check-circle' : 'checkbox-blank-circle-outline'
                    }
                    size={24}
                    color={'#c14dbd'}
                  />
                  <Text style={styles.donttxt}>I have agree with </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text style={styles.signupTxt}>Terms and Condition</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={registerSubmit}>
                <LinearGradient
                  colors={['#853b92', '#4b0892']}
                  style={styles.loginBtn}>
                  <Text style={styles.loginBtnTxt}>SUBMIT NOW</Text>
                </LinearGradient>
              </TouchableOpacity>
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
    marginBottom: 10,
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
    width: 170,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    marginBottom: 50,
  },
  loginBtnTxt: {
    color: colors.white,
    fontSize: 16,
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
});

export default RegisterComponent;
