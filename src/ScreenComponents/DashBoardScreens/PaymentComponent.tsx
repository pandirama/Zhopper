/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../utils/appStyles';
import {colors} from '../../utils/colors';
import DashBoardHeaderComponent from '../../components/DashBoardHeaderComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';

const PaymentComponent = () => {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.status}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <DashBoardHeaderComponent title={'Payment'} />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.loginFormView}>
            <View
              style={{
                marginTop: 30,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                backgroundColor: colors.white,
              }}>
              <LinearGradient
                colors={['#853b92', '#4b0892']}
                style={{
                  borderTopLeftRadius: 20,
                  borderTopRightRadius: 20,
                }}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 18,
                    fontFamily: fontFamily.poppins_bold,
                    marginLeft: 10,
                    marginTop: 10,
                  }}>
                  Most Trusted Sellers
                </Text>
                <Text
                  style={{
                    color: '#b691c1',
                    fontSize: 12,
                    marginLeft: 10,
                    marginBottom: 10,
                    fontFamily: fontFamily.poppins_medium,
                  }}>
                  Lorem ipsum dolor sit amet, consectetur
                </Text>
              </LinearGradient>
              <View
                style={{marginTop: 20, alignItems: 'center', marginBottom: 30}}>
                <MaterialIcons
                  name="qr-code-2"
                  color={colors.black}
                  size={120}
                />
                <View
                  style={{
                    position: 'absolute',
                    top: 120,
                  }}>
                  <TouchableOpacity style={{marginTop: 10}}>
                    <LinearGradient
                      colors={['#853b92', '#4b0892']}
                      style={styles.tabBtn}>
                      <Text style={styles.tabTxt}>SCAN AND PAY</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                backgroundColor: '#ebdef7',
                borderRadius: 100,
                borderWidth: 12,
                borderColor: '#c498ec',
                width: 120,
                height: 120,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: -20,
                top: 5,
              }}>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 22,
                  fontFamily: fontFamily.poppins_bold,
                }}>
                80%
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 12,
                  fontFamily: fontFamily.poppins_semi_bold,
                }}>
                In Progress
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 20,
              marginRight: 20,
              marginTop: 30,
            }}>
            <View
              style={[
                appStyles.boxShadow,
                {
                  flex: 1,
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  marginRight: 10,
                  marginLeft: 10,
                  paddingTop: 15,
                  paddingLeft: 20,
                  paddingBottom: 10,
                },
              ]}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../../assets/points_logo.png')}
                  style={{
                    width: 60,
                    height: 60,
                    marginRight: 20,
                    alignSelf: 'center',
                  }}
                />
                <Image
                  source={require('../../assets/point_icon.png')}
                  style={{alignSelf: 'center'}}
                />
              </View>

              <Text
                style={{
                  color: '#7f7f7f',
                  fontSize: 13,
                  fontFamily: fontFamily.poppins_semi_bold,
                  marginTop: 5,
                }}>
                Points
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 20,
                  fontFamily: fontFamily.poppins_bold,
                }}>
                120,00
              </Text>
            </View>
            <View
              style={[
                appStyles.boxShadow,
                {
                  flex: 1,
                  backgroundColor: colors.white,
                  borderRadius: 10,
                  marginRight: 10,
                  marginLeft: 10,
                  paddingLeft: 20,
                  paddingTop: 15,
                  paddingBottom: 10,
                },
              ]}>
              <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <Image
                  source={require('../../assets/transactions_logo.png')}
                  style={{
                    width: 60,
                    height: 60,
                    marginRight: 25,
                    alignSelf: 'center',
                  }}
                />
                <Image
                  source={require('../../assets/dollor_icon.png')}
                  style={{marginRight: 30, alignSelf: 'center'}}
                />
              </View>
              <Text
                style={{
                  color: '#7f7f7f',
                  fontSize: 13,
                  fontFamily: fontFamily.poppins_semi_bold,
                  marginTop: 5,
                }}>
                Transaction
              </Text>
              <Text
                style={{
                  color: colors.black,
                  fontSize: 20,
                  fontFamily: fontFamily.poppins_bold,
                }}>
                9,464,00
              </Text>
            </View>
          </View>
          <LinearGradient
            colors={['#9b6ec6', '#b386dc', '#c79bef']}
            style={styles.container}>
            <View style={{marginTop:15, marginBottom:15, marginLeft:15}}>
              <Text style={styles.titleTxt}>Account Holder</Text>
              <Text style={styles.subtitleTxt}>Rosy</Text>
              <View style={styles.borderView} />
              <Text style={styles.titleTxt}>Account Number</Text>
              <Text style={styles.subtitleTxt}>1245 9466 3895</Text>
            </View>
          </LinearGradient>
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
    justifyContent: 'center',
    width: '100%',
    marginTop: 30,
  },
  loginFormView: {
    marginLeft: 30,
    marginRight: 30,
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
    fontSize: 18,
    color: colors.black,
    fontFamily: fontFamily.poppins_semi_bold,
  },
  subtitleTxt: {
    fontSize: 15,
    color: '#685876',
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
    marginBottom: 15,
    marginTop: 15,
  },
});

export default PaymentComponent;
