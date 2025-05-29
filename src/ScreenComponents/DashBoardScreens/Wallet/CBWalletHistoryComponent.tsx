/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Animated,
  FlatList,
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
import {
  useCBWalletTransactionMutation,
  useClaimCashBackMutation,
} from '../../../api/walletAPI';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../utils/common';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {Ionicons} from '../../../utils/IconUtils';
import LinearGradient from 'react-native-linear-gradient';

type Props = NativeStackScreenProps<any, 'CBWALLET_HISTORY'>;

const AppCollapse = ({item, claimCashBack, index}: any) => {
  const status = item?.status_click === 0 ? 'Claim' : 'Claimed';
  const [collapsed, setCollapsed] = useState(true);
  const [animation] = useState(new Animated.Value(0));

  const toggleCollapse = () => {
    if (collapsed) {
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setCollapsed(!collapsed);
      });
    } else {
      setCollapsed(!collapsed);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <View>
      <View
        style={[
          appStyles.boxShadow,
          styles.walletSubContainer,
          collapsed
            ? {
                backgroundColor: '#f0e5f9',
              }
            : {backgroundColor: colors.white},
          status === 'Claim'
            ? {borderRightColor: '#83ca3b'}
            : {borderRightColor: '#d31d1d'},
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 0.5}}>
            <Text style={styles.itemTitleTxt}>ID</Text>
            <Text style={styles.itemSubTitleTxt}>{index + 1}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemTitleTxt}>CB POINT</Text>
            <Text style={styles.itemSubTitleTxt}>
              {item?.['Cash Back Point']}
            </Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemTitleTxt}>DAILY 2%</Text>
            <Text style={styles.itemSubTitleTxt}>{item?.['DAILY 2%']}</Text>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.itemTitleTxt}>STATUS</Text>
            {status === 'Claim' ? (
              <TouchableOpacity onPress={() => claimCashBack(item?.id)}>
                <LinearGradient
                  colors={['#853b92', '#4b0892']}
                  style={styles.tabBtn}>
                  <Text style={styles.tabTxt}>{status}</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <Text style={styles.itemSubTitleTxt}>{status}</Text>
            )}
          </View>
        </View>

        <Animated.View
          style={{
            width: '100%',
            marginBottom: 10,
          }}>
          {!collapsed && (
            <View style={{marginTop: 10}}>
              <Text style={styles.itemTitleTxt}>COLLECTED</Text>
              <Text style={styles.itemSubTitleTxt}>{item?.COLLECTED}</Text>
            </View>
          )}
        </Animated.View>
      </View>
      <TouchableOpacity
        onPress={toggleCollapse}
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          justifyContent: 'center',
          borderRadius: 100,
          backgroundColor: '#5b159d',
          width: 22,
          height: 22,
          position: 'absolute',
          bottom: -10,
        }}>
        <Ionicons
          name={collapsed ? 'chevron-down' : 'chevron-up'}
          size={15}
          color={colors.white}
        />
      </TouchableOpacity>
    </View>
  );
};

const CBWalletHistoryComponent = ({}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();

  const [transHistory, setTransHistory] = useState<any>(null);

  const {userInfo} = useSelector(({authReducer}: any) => authReducer);

  const [CBWalletTransaction, {isLoading}] = useCBWalletTransactionMutation();
  const [claimCashBack, {isLoading: isClaimLoadding}] =
    useClaimCashBackMutation();

  useEffect(() => {
    toggleBackdrop(isLoading || isClaimLoadding);
  }, [isLoading || isClaimLoadding]);

  const getTransactionHistory = async () => {
    try {
      const transactionResponse = await CBWalletTransaction({
        userid: userInfo[0]?.userid,
      }).unwrap();

      if (transactionResponse[0]?.status === 1) {
        setTransHistory(transactionResponse[0]?.data);
      } else {
        showToast({
          type: 'error',
          text1: getErrorMessage(transactionResponse[0]),
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
      getTransactionHistory();
      return () => {};
    }, []),
  );

  const getClaimCashBack = async (claimID: any) => {
    try {
      const response = await claimCashBack({
        userid: userInfo[0]?.userid,
        id: claimID,
      }).unwrap();

      if (response?.[0]?.status === 1) {
        showToast({
          type: 'success',
          text1: response?.[0]?.message,
        });
        getTransactionHistory();
      } else {
        showToast({
          type: 'error',
          text1: response?.[0]?.message,
        });
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  const renderItem = ({item, index}: any) => {
    return (
      <AppCollapse item={item} claimCashBack={getClaimCashBack} index={index} />
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
          <DashBoardHeaderComponent title={'Claim Cash Back'} back />
          <Text style={styles.titleTxt}>Claim Cash Back</Text>
          {transHistory?.length > 0 ? (
            <FlatList
              data={transHistory}
              renderItem={renderItem}
              contentContainerStyle={{paddingBottom: 25}}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={false}
              keyExtractor={(item, index) => 'key' + index}
            />
          ) : (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <Text
                style={{
                  color: colors.black,
                  textAlign: 'center',
                  fontWeight: 700,
                  fontFamily: fontFamily.poppins_bold,
                  fontSize: 20,
                }}>
                No Transaction Records
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  titleTxt: {
    fontSize: 20,
    color: '#000000',
    fontFamily: fontFamily.poppins_semi_bold,
    marginTop: 25,
    marginLeft: 16,
  },
  subtitleTxt: {
    fontSize: 14,
    color: '#8c8b8b',
    fontFamily: fontFamily.poppins_medium,
    marginLeft: 16,
    marginBottom: 15,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 15,
    marginTop: 20,
    paddingTop: 10,
    borderRightWidth: 10,
    marginLeft: 16,
    marginRight: 16,
    paddingBottom: 5,
  },
  itemTitleTxt: {
    fontSize: 16,
    color: '#5b159d',
    fontFamily: fontFamily.poppins_semi_bold,
  },
  itemSubTitleTxt: {
    fontSize: 13,
    color: '#333333',
    fontFamily: fontFamily.poppins_medium,
  },
  flatListColumn: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  tabBtn: {
    height: 25,
    width: 75,
    borderRadius: 20,
    justifyContent: 'center',
  },
  tabTxt: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fontFamily.poppins_semi_bold,
  },
});

export default CBWalletHistoryComponent;
