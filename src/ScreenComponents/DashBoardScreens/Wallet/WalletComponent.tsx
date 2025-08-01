/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
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
import {useWalletBalanceMutation} from '../../../api/walletAPI';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../utils/common';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {Ionicons} from '../../../utils/IconUtils';
import {
  useGetReferralQRQuery,
  useLazyGetProfileQuery,
} from '../../../api/profileAPI';
import {profileAction} from '../../../reducer/profile/profileSlice';
import {useAppDispatch} from '../../../store';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<any, 'WALLET'>;

const WalletComponent = ({navigation}: Props) => {
  const { t } = useTranslation();
  const {showToast, toggleBackdrop} = useCommon();
  const dispatch = useAppDispatch();

  const [walletBalances, setWalletBalances] = useState<any>(null);

  const {userInfo} = useSelector(({authReducer}: any) => authReducer);

  const [walletBalance, {isLoading}] = useWalletBalanceMutation();

  const [getProfile, results] = useLazyGetProfileQuery();

  const {isFetching, refetch} = useGetReferralQRQuery({
    userid: userInfo[0]?.userid,
  });

  useEffect(() => {
    toggleBackdrop(isLoading || isFetching || results?.isFetching);
  }, [isLoading || isFetching || results?.isFetching]);

  useEffect(() => {
    if (results && results.data) {
      let userObj: any = {
        fullname: '',
        shopper_rank: '',
      };
      results.data[0]?.data.filter((result: any) => {
        if (result.hasOwnProperty('fullname')) {
          userObj = {
            ...userObj,
            fullname: result?.fullname,
          };
        } else if (result.hasOwnProperty('shopper_rank')) {
          userObj = {...userObj, shopper_rank: result?.shopper_rank};
        }
      });
      dispatch(profileAction.setUserProfile(userObj));
    }
  }, [results]);

  const getWalletBalnce = async () => {
    try {
      const walletResponse = await walletBalance({
        userid: userInfo[0]?.userid,
      }).unwrap();

      if (walletResponse[0]?.status === 1) {
        const res = walletResponse[0]?.data?.filter((wallet: any) => {
          return wallet?.status_show !== 0;
        });
        setWalletBalances(res);
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  const getReferralFetch = () => {
    refetch()
      .then((response: any) => {
        const {data, status, message} = response;
        if (status) {
          dispatch(profileAction.setReferralLink(data[0]?.link));
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
      getWalletBalnce();
      getProfile({userid: userInfo[0]?.userid});
      getReferralFetch();
      return () => {};
    }, []),
  );

  const showeButton = (btnChange: any) => {
    if (btnChange?.status_scan === 1) {
      return (
        <TouchableOpacity
          style={{marginTop: 10, marginBottom: 5}}
          onPress={() => {
            navigation.navigate('QRCODE', {
              wallet: btnChange,
            });
          }}>
          <LinearGradient colors={['#853b92', '#4b0892']} style={styles.tabBtn}>
            <Text style={styles.tabTxt}>{t('SCAN_TO_PAY')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    if (btnChange?.status_claim === 1) {
      return (
        <TouchableOpacity
          style={{marginTop: 10, marginBottom: 5}}
          onPress={() => {
            navigation.navigate('CBWALLET_HISTORY');
          }}>
          <LinearGradient colors={['#853b92', '#4b0892']} style={styles.tabBtn}>
            <Text style={styles.tabTxt}>{t('CLAIM')}</Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
  };

  const renderItem = ({item}: any) => {
    return (
      <View
        style={[
          appStyles.boxShadow,
          {
            flex: 1 / 2,
            backgroundColor: colors.white,
            borderRadius: 10,
            marginRight: 10,
            marginLeft: 10,
            paddingTop: 15,
            paddingLeft: 20,
            paddingBottom: 10,
            marginTop: 10,
            marginBottom: 10,
          },
        ]}>
        <Image source={{uri: item?.icon}} style={styles.itemLogo} />
        <Text
          style={{
            color: '#951bb1',
            fontSize: 16,
            fontFamily: fontFamily.poppins_semi_bold,
            marginTop: 5,
          }}>
          {item?.wallet}
        </Text>
        <Text
          style={{
            color: colors.black,
            fontSize: 16,
            fontFamily: fontFamily.poppins_medium,
          }}>
          {`${item?.currency} ${item?.balance}`}
        </Text>
        {showeButton(item)}
      </View>
    );
  };

  const ListFooter = () => {
    return (
      <View
        style={{
          borderRadius: 15,
          padding: 10,
          marginTop: 40,
          marginLeft: 10,
          marginRight: 10,
          backgroundColor: '#f7f6f6',
        }}>
        <Text style={styles.titleTxt}>{t('RECENT_TRANSACTION')}</Text>
        <View style={styles.walletContainer}>
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => {
                navigation.navigate('TRANS_HISTORY', {
                  gateway: 'RP-wallet',
                  title: t('SPEND_RECORD'),
                  subTitle: `${t('SPEND_RECORD')} -> RP ${t('WALLET')}`,
                });
              }}>
              <Image
                source={require('../../../assets/record_icon.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={styles.walletTitleTxt}>{t('SPEND_RECORD')}</Text>
              <Ionicons
                name={'chevron-forward'}
                size={22}
                color={colors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => {
                navigation.navigate('TRANS_HISTORY', {
                  gateway: 'CB-wallet',
                  title: t('CASH_BACK_WALLET'),
                  subTitle: `${t('CASH_BACK_WALLET')} -> ${t('CASH_BACK_WALLET')}`,
                });
              }}>
              <Image
                source={require('../../../assets/cb_wallet_icon.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={styles.walletTitleTxt}>{t('CASH_BACK_WALLET')}</Text>
              <Ionicons
                name={'chevron-forward'}
                size={22}
                color={colors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
            <View style={styles.borderView} />
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => {
                navigation.navigate('TRANS_HISTORY', {
                  gateway: 'SRP-wallet',
                  title: t('REDEMPTION'),
                  subTitle: `${t('REDEMPTION')} -> SRP ${t('WALLET')}`,
                });
              }}>
              <Image
                source={require('../../../assets/redemption_icon.png')}
                style={{width: 50, height: 50}}
              />
              <Text style={styles.walletTitleTxt}>{t('REDEMPTION')}</Text>
              <Ionicons
                name={'chevron-forward'}
                size={22}
                color={colors.black}
                style={styles.icon}
              />
            </TouchableOpacity>

            <View style={styles.borderView} />
            <TouchableOpacity
              style={styles.walletTouch}
              onPress={() => {
                navigation.navigate('TRANS_HISTORY', {
                  gateway: 'MM-wallet',
                  title: `MM ${t('WALLET')}`,
                  subTitle: `MM ${t('WALLET')}`,
                });
              }}>
              <Image
                source={require('../../../assets/MM_wallet.png')}
                style={{width: 42, height: 42}}
              />
              <Text style={styles.walletTitleTxt}>MM {t('WALLET')}</Text>
              <Ionicons
                name={'chevron-forward'}
                size={22}
                color={colors.black}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
          <DashBoardHeaderComponent title={t('ASSETS')} />
          <FlatList
            data={walletBalances}
            renderItem={renderItem}
            numColumns={2}
            columnWrapperStyle={styles.flatListColumn}
            contentContainerStyle={styles.flatListCotent}
            ListFooterComponent={<ListFooter />}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
          />
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
  itemLogo: {
    width: 50,
    height: 50,
  },
  icon: {
    marginRight: 10,
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
    borderRadius: 20,
    justifyContent: 'center',
    width: 160,
    alignSelf: 'center',
    marginTop: 40,
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
  walletContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  walletTouch: {
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 10,
    paddingLeft: 0,
  },
  walletTitleTxt: {
    fontSize: 16,
    color: '#333333',
    flex: 1,
    textAlignVertical: 'center',
    marginLeft: 10,
    fontFamily: fontFamily.poppins_semi_bold,
  },
  flatListCotent: {
    paddingBottom: 30,
    marginTop: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  flatListColumn: {
    flex: 1,
    // justifyContent: 'space-evenly',
  },
  tabBtn: {
    height: 30,
    borderRadius: 20,
    justifyContent: 'center',
    width: 120,
  },
  tabTxt: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fontFamily.poppins_semi_bold,
  },
});

export default WalletComponent;
