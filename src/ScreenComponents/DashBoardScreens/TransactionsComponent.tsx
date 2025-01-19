/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../utils/appStyles';
import {colors} from '../../utils/colors';
import DashBoardHeaderComponent from '../../components/DashBoardHeaderComponent';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const transactions = [
  {
    details: 'Spend Credit  Remark:',
    data: '2024-11-14',
    sc: '5.00000',
    local: 'MYR 28.0000',
    type: 'up',
  },
  {
    details: 'HP-Wallet amount transfer to Remark:',
    data: '2024-11-11',
    sc: '5.00000',
    local: 'MYR 54.0000',
    type: 'down',
  },
  {
    details: 'BP-wallet convert to HP-wallet amount 10 ',
    data: '2024-10-10',
    sc: '5.00000',
    local: 'MYR 22.0000',
    type: 'up',
  },
  {
    details: 'Spend  Credit Remark',
    data: '2024-09-14',
    sc: '5.00000',
    local: 'MYR 10.0000',
    type: 'down',
  },
];

const TransactionsComponent = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  const totalPackages = ['Bronze', 'Silver', 'Gold', 'Platinum'];

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
        <DashBoardHeaderComponent title={'Transactions'} />
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
                source={require('../../assets/profile_user.png')}
                style={{width: 60, height: 60}}
              />
              <View style={{marginLeft: 10, justifyContent: 'center', flex: 1}}>
                <Text
                  style={{
                    color: '#310855',
                    fontSize: 16,
                    fontFamily: fontFamily.poppins_semi_bold,
                  }}>
                  JR Rosy
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
                  source={require('../../assets/arrow_right.png')}
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
                borderRadius: 10,
                padding: 10,
                marginTop: 10,
              }}>
              <Text style={styles.titleTxt}>Wallet Transaction History</Text>
              <Text style={styles.subtitleTxt}>Details of transaction</Text>
            </View>
            <LinearGradient
              colors={['#853b92', '#4b0892']}
              style={{marginTop: 10}}>
              <View style={styles.personcontainer}>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 16,
                    fontFamily: fontFamily.poppins_semi_bold,
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Details
                </Text>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 16,
                    fontFamily: fontFamily.poppins_semi_bold,
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Data
                </Text>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 16,
                    fontFamily: fontFamily.poppins_semi_bold,
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  SC
                </Text>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 16,
                    fontFamily: fontFamily.poppins_semi_bold,
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Local
                </Text>
                <Text
                  style={{
                    color: colors.white,
                    fontSize: 16,
                    fontFamily: fontFamily.poppins_semi_bold,
                    flex: 1,
                    textAlign: 'center',
                  }}>
                  Type
                </Text>
              </View>
            </LinearGradient>
            {transactions.map(item => {
              return (
                <>
                  <View style={styles.historycontainer}>
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 13,
                        fontFamily: fontFamily.poppins_medium,
                        flex: 1,
                        textAlign: 'center',
                      }}>
                      {item.details}
                    </Text>
                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 13,
                        fontFamily: fontFamily.poppins_medium,
                        flex: 1,
                        textAlign: 'center',
                      }}>
                      {item?.data}
                    </Text>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'center',
                      }}>
                      {item.type === 'up' ? (
                        <AntDesign
                          name="plus"
                          color={'#388a01'}
                          size={15}
                          style={{marginTop: 2}}
                        />
                      ) : (
                        <AntDesign
                          name="minus"
                          color={'#ff0303'}
                          size={15}
                          style={{marginTop: 2}}
                        />
                      )}
                      <Text
                        style={{
                          color: colors.black,
                          fontSize: 13,
                          fontFamily: fontFamily.poppins_medium,
                          flex: 1,
                        }}>
                        {item.sc}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: colors.black,
                        fontSize: 13,
                        flex: 1,
                        fontFamily: fontFamily.poppins_medium,
                        textAlign: 'center',
                      }}>
                      {item.local}
                    </Text>

                    <View style={{flex: 1, alignItems: 'center'}}>
                      {item.type === 'up' ? (
                        <Ionicons name="arrow-up" color={'#388a01'} size={20} />
                      ) : (
                        <Ionicons
                          name="arrow-down"
                          color={'#ff0303'}
                          size={20}
                        />
                      )}
                    </View>
                  </View>
                  <View style={styles.borderView} />
                </>
              );
            })}
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
  personcontainer: {
    justifyContent: 'center',
    width: '100%',
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
  },
  historycontainer: {
    justifyContent: 'center',
    width: '100%',
    paddingBottom: 8,
    paddingTop: 8,
    flexDirection: 'row',
    backgroundColor: colors.white,
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
    marginLeft: 10,
    marginRight: 10,
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
  icon: {},
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
    fontSize: 20,
    color: '#000000',
    fontFamily: fontFamily.poppins_semi_bold,
  },
  subtitleTxt: {
    fontSize: 14,
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
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    paddingLeft: 0,
  },
});

export default TransactionsComponent;
