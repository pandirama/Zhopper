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
import {useGetEditProfileQuery} from '../../../api/profileAPI';
import {useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {countries} from '../../AuthScreens/RegisterComponent';
import {Dropdown} from 'react-native-element-dropdown';
import {KeyboardAvoidingView} from 'react-native-keyboard-controller';

const ProfileComponent = ({navigation}: any) => {
  const {showToast, toggleBackdrop} = useCommon();
  // let svg = useRef<MutableRefObject<Svg | undefined>>(null);
  const [fullname, setFullName] = useState('');
  const [nameStatus, setNameStatus] = useState(false);
  const [email, setEmail] = useState('');
  const [emailStatus, setEmailStatus] = useState(false);
  const [country, setCountry] = useState('');
  const [countryStatus, setCountryStatus] = useState(false);
  const [userName, setUserName] = useState('');
  const [userStatus, setUserStatus] = useState(false);
  const [shopperRank, setShopperRank] = useState(0);
  const [rankStatus, setRankStatus] = useState(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const {referralLink, userProfile} = useSelector(
    ({profileReducer}: any) => profileReducer,
  );

  const {userInfo} = useSelector(({authReducer}: any) => authReducer);

  const {isFetching, refetch} = useGetEditProfileQuery({
    userid: userInfo?.[0]?.userid,
  });

  useEffect(() => {
    toggleBackdrop(isFetching);
  }, [isFetching]);

  const getProfile = () => {
    refetch()
      .then((response: any) => {
        const {data, status, message} = response;
        if (status) {
          data[0]?.data.filter((result: any) => {
            if (result.hasOwnProperty('fullname')) {
              setFullName(result?.fullname);
              setNameStatus(result?.status === 1 ? false : true);
            } else if (result.hasOwnProperty('email')) {
              setEmail(result?.email);
              setEmailStatus(result?.status === 1 ? false : true);
            } else if (result.hasOwnProperty('country')) {
              setCountry(result?.country);
              setCountryStatus(result?.status === 1 ? true : false);
            } else if (result.hasOwnProperty('username')) {
              setUserName(result?.username);
              setUserStatus(result?.status === 1 ? false : true);
            } else if (result.hasOwnProperty('shopper_rank')) {
              setShopperRank(result?.shopper_rank?.toString());
              setRankStatus(result?.status === 1 ? false : true);
            }
          });
        } else {
          showToast({
            type: 'error',
            text1: getErrorMessage(message),
          });
        }
      })
      .catch(error => {
        showToast({
          type: 'error',
          text1: getErrorMessage(error),
        });
      });
  };

  useFocusEffect(
    useCallback(() => {
      getProfile();
      return () => {};
    }, []),
  );

  const fullNameFieldRef = useRef<TextInput>();
  const emailFieldRef = useRef<TextInput>();
  const countryFieldRef = useRef<TextInput>();
  const userNameFieldRef = useRef<TextInput>();
  const shopperRankFieldRef = useRef<TextInput>();

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
          <DashBoardHeaderComponent title={'Profile'} />
          <KeyboardAvoidingView
            behavior={'padding'}
            keyboardVerticalOffset={25}
            style={{flex: 1}}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps={'never'}>
              <LinearGradient
                colors={['#9b6ec6', '#b386dc', '#c79bef']}
                style={styles.container}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 15,
                    marginTop: 10,
                    marginBottom: 10,
                  }}>
                  <Image
                    source={require('../../../assets/person.png')}
                    style={{width: 60, height: 60}}
                  />
                  <View
                    style={{marginLeft: 10, justifyContent: 'center', flex: 1}}>
                    <Text
                      style={{
                        color: '#310855',
                        fontSize: 16,
                        fontWeight: 800,
                        fontFamily: fontFamily.poppins_semi_bold,
                      }}>
                      {fullname}
                    </Text>
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 14,
                        fontWeight: 600,
                        fontFamily: fontFamily.poppins_regular,
                      }}>
                      {userProfile?.shopper_rank}
                    </Text>
                  </View>
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
                        <QRCode
                          value={referralLink}
                          // getRef={(ref?) => (svg = ref)}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                      <TouchableOpacity
                        onPress={() => {
                          // svg.toDataURL(data => {
                          //   const shareImageBase64 = {
                          //     title: 'QR',
                          //     message: 'Ehi, this is my QR code',
                          //     url: `data:image/png;base64,${data}`,
                          //   };
                          // });
                          // navigation.navigate('QRCODE')
                        }}>
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
                  <Text style={styles.subtitleTxt}>
                    Basic details about you
                  </Text>
                  <TextInputComponent
                    placeHolder={'Enter Your FullName'}
                    headText={'Full Name'}
                    onChangeValue={setFullName}
                    value={fullname}
                    editable={nameStatus}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    onSubmitEditing={() => fullNameFieldRef.current?.focus()}
                  />
                  <TextInputComponent
                    ref={fullNameFieldRef}
                    placeHolder={'Enter Your Email'}
                    headText={'Email'}
                    onChangeValue={setEmail}
                    value={email}
                    editable={emailStatus}
                    returnKeyType={Platform.OS === 'ios' ? 'done' : 'next'}
                    onSubmitEditing={() => emailFieldRef.current?.focus()}
                  />
                  <View style={styles.dropDownView}>
                    <Dropdown
                      dropdownPosition="bottom"
                      style={[
                        styles.dropDown,
                        isFocus && {borderColor: colors.primary},
                      ]}
                      disable={countryStatus}
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

                  <TextInputComponent
                    placeHolder={'Enter Your User Name'}
                    headText={'user Name'}
                    onChangeValue={setUserName}
                    value={userName}
                    editable={userStatus}
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
                    editable={rankStatus}
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
          </KeyboardAvoidingView>
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

export default ProfileComponent;
