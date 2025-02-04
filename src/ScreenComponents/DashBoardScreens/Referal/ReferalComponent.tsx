/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
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
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {useFocusEffect} from '@react-navigation/native';
import {useReferralMutation} from '../../../api/referralAPI';
import Clipboard from '@react-native-clipboard/clipboard';

const ReferalComponent = () => {
  const {showToast, toggleBackdrop} = useCommon();

  const [referrals, setReferrals] = useState<any>(null);

  const {referralLink} = useSelector(({profileReducer}: any) => profileReducer);

  const {userInfo} = useSelector(({authReducer}: any) => authReducer);

  const [referral, {isLoading}] = useReferralMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getReferral = async () => {
    try {
      const referralResponse = await referral({
        userid: userInfo[0]?.userid,
      }).unwrap();

      if (referralResponse[0]?.status === 1) {
        setReferrals(referralResponse[0]);
        showToast({
          type: 'success',
          text1: referralResponse[0]?.message,
        });
      } else {
        showToast({
          type: 'error',
          text1: getErrorMessage(referralResponse[0]),
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
      getReferral();
      return () => {};
    }, []),
  );

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 15,
          marginRight: 15,
          backgroundColor: colors.white,
          padding: 10,
        }}>
        <Image
          source={require('../../../assets/person.png')}
          style={{width: 50, height: 50}}
        />

        <Text
          style={{
            flex: 1,
            fontFamily: fontFamily.poppins_medium,
            fontSize: 12,
            color: colors.black,
            marginLeft: 10,
          }}>
          {item?.username}
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.poppins_semi_bold,
            fontSize: 12,
            color: '#951bb1',
            marginRight: 10,
          }}>
          {item?.joindate}
        </Text>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => {
    return (
      <>
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
                  fontSize: 16,
                  marginTop: 10,
                  fontFamily: fontFamily.poppins_bold,
                }}>
                My Referral QR Code
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#b691c1',
                  fontSize: 10,
                  marginBottom: 10,
                  fontFamily: fontFamily.poppins_medium,
                }}>
                Share with your friend, register free account !
              </Text>
            </LinearGradient>
            <ImageBackground
              source={require('../../../assets/referral_banner.png')}
              style={{height: 180}}>
              <View
                style={{flexDirection: 'row', margin: 20, borderRadius: 10}}>
                <View style={{flex: 1}}>
                  <Image
                    source={require('../../../assets/referral_person.png')}
                    style={{width: 150, height: 150}}
                  />
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                  }}>
                  <View
                    style={{
                      backgroundColor: colors.white,
                      width: 100,
                      height: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <QRCode value={referralLink} size={90} />
                  </View>

                  <TouchableOpacity
                    style={styles.tabBtn}
                    onPress={() => {
                      Clipboard.setString(referralLink);
                    }}>
                    <Text style={styles.tabTxt}>TAB AND COPY</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
            }}>
            <View
              style={[
                appStyles.boxShadow,
                {
                  flex: 1,
                  backgroundColor: colors.white,
                  borderRadius: 5,
                  marginRight: 10,
                  marginLeft: 10,
                  paddingTop: 15,
                  paddingLeft: 20,
                  paddingBottom: 10,
                },
              ]}>
              <Image
                source={require('../../../assets/team_icon.png')}
                style={{width: 50, height: 50}}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: 13,
                  fontFamily: fontFamily.poppins_semi_bold,
                }}>
                Team
              </Text>
              <Text
                style={{
                  color: '#951bb1',
                  fontSize: 13,
                  fontFamily: fontFamily.poppins_bold,
                }}>
                {referrals?.team}
              </Text>
            </View>
            <View
              style={[
                appStyles.boxShadow,
                {
                  flex: 1,
                  backgroundColor: colors.white,
                  borderRadius: 5,
                  marginRight: 10,
                  marginLeft: 10,
                  paddingLeft: 20,
                  paddingTop: 15,
                  paddingBottom: 10,
                },
              ]}>
              <Image
                source={require('../../../assets/direct_icon.png')}
                style={{width: 50, height: 50}}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: 13,
                  fontFamily: fontFamily.poppins_semi_bold,
                }}>
                Direct
              </Text>
              <Text
                style={{
                  color: '#951bb1',
                  fontSize: 13,
                  fontFamily: fontFamily.poppins_bold,
                }}>
                {referrals?.direct}
              </Text>
            </View>
          </View>
          <LinearGradient
            colors={['#853b92', '#4b0892']}
            style={styles.personcontainer}>
            <Text
              style={{
                color: colors.white,
                fontSize: 16,
                marginTop: 10,
                marginBottom: 10,
                marginLeft: 10,
                fontFamily: fontFamily.poppins_semi_bold,
              }}>
              Personal Clients
            </Text>
          </LinearGradient>
        </View>
      </>
    );
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
          <DashBoardHeaderComponent title={'Referral'} />
          <FlatList
            data={referrals?.data}
            renderItem={renderItem}
            ItemSeparatorComponent={() => {
              return <View style={styles.borderView} />;
            }}
            style={{marginBottom: 10}}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: any) => item?._id}
            ListHeaderComponent={<ListHeader />}
          />
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
    height: 85,
    justifyContent: 'center',
    marginTop: 20,
  },
  personcontainer: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  loginFormView: {
    marginLeft: 15,
    marginRight: 15,
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
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    marginTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  tabTxt: {
    color: colors.black,
    fontSize: 14,
    paddingTop: 8,
    paddingBottom: 8,
    textAlign: 'center',
    fontFamily: fontFamily.poppins_semi_bold,
  },
  loginBtn: {
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    width: 160,
    alignSelf: 'center',
    marginTop: 50,
    marginBottom: 30,
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
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 15,
    marginLeft: 15,
    paddingLeft: 0,
  },
});

export default ReferalComponent;
