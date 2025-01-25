/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
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

const clients = [
  {
    icon: require('../../../assets/acct_user1.png'),
    name: 'Accet User01',
    level: 'Level 1',
  },
  {
    icon: require('../../../assets/acct_user2.png'),
    name: 'Accet User05',
    level: 'Level 2',
  },
  {
    icon: require('../../../assets/acct_user3.png'),
    name: 'Accet User02',
    level: 'Level 3',
  },
  {
    icon: require('../../../assets/acct_user4.png'),
    name: 'Accet User03',
    level: 'Level 0',
  },
  {
    icon: require('../../../assets/acct_user5.png'),
    name: 'Accet User04',
    level: 'Level 2',
  },
  {
    icon: require('../../../assets/acct_user6.png'),
    name: 'Accet User06',
    level: 'Level 5',
  },
];

const ReferalComponent = () => {
  const {referralLink, userProfile} = useSelector(
    ({profileReducer}: any) => profileReducer,
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
        <Image source={item?.icon} style={{width: 50, height: 50}} />

        <Text
          style={{
            flex: 1,
            fontFamily: fontFamily.poppins_medium,
            fontSize: 12,
            color: colors.black,
            marginLeft: 10,
          }}>
          {item?.name}
        </Text>
        <Text
          style={{
            fontFamily: fontFamily.poppins_semi_bold,
            fontSize: 12,
            color: '#951bb1',
            marginRight: 10,
          }}>
          {item?.level}
        </Text>
      </TouchableOpacity>
    );
  };

  const ListHeader = () => {
    return (
      <>
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
                227
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
                50
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
                source={require('../../../assets/network_icon.png')}
                style={{width: 50, height: 50}}
              />
              <Text
                style={{
                  color: colors.black,
                  fontSize: 13,
                  fontFamily: fontFamily.poppins_semi_bold,
                }}>
                Network
              </Text>
              <Text
                style={{
                  color: '#951bb1',
                  fontSize: 13,
                  fontFamily: fontFamily.poppins_bold,
                }}>
                100+
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
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent title={'Referral'} />
        <FlatList
          data={clients}
          renderItem={renderItem}
          ItemSeparatorComponent={() => {
            return <View style={styles.borderView} />;
          }}
          style={{marginBottom: 10}}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => item?._id}
          ListHeaderComponent={<ListHeader />}
        />
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
    paddingLeft: 12,
    paddingRight: 12,
  },
  tabTxt: {
    color: colors.black,
    fontSize: 14,
    paddingTop: 5,
    paddingBottom: 5,
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
