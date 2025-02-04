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
import {useWalletTransactionMutation} from '../../../api/walletAPI';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../utils/common';
import useCommon from '../../../hooks/useCommon';
import {useSelector} from 'react-redux';
import {Ionicons} from '../../../utils/IconUtils';

type Props = NativeStackScreenProps<any, 'TRANS_HISTORY'>;

const AppCollapse = ({item}: any) => {
  const dateTime = item?.date?.split(' ');
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

  const heightInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50],
  });
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
          item?.type === 'credit'
            ? {borderRightColor: '#83ca3b'}
            : {borderRightColor: '#d31d1d'},
        ]}>
        <View style={{flexDirection: 'row'}}>
          <View style={{flex: 1}}>
            <Text style={styles.itemTitleTxt}>DATE</Text>
            <Text style={styles.itemSubTitleTxt}>{dateTime[0]}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemTitleTxt}>TIME</Text>
            <Text style={styles.itemSubTitleTxt}>{dateTime[1]}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemTitleTxt}>AMOUNT</Text>
            <Text style={styles.itemSubTitleTxt}>{item?.amount}</Text>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.itemTitleTxt}>CURRENCY</Text>
            <Text style={styles.itemSubTitleTxt}>{item?.currency}</Text>
          </View>
        </View>

        <Animated.View
          style={{
            height: heightInterpolate,
            width: '100%',
            marginBottom: 10,
          }}>
          {!collapsed && (
            <View style={{marginTop: 10, marginBottom: 15}}>
              <Text style={styles.itemTitleTxt}>DESCRIPTION</Text>
              <Text style={styles.itemSubTitleTxt}>{item?.description}</Text>
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

const TransactionHistoryComponent = ({route}: Props) => {
  const {gateway} = route?.params ?? {};

  const {showToast, toggleBackdrop} = useCommon();

  const [transHistory, setTransHistory] = useState<any>(null);

  const {userInfo} = useSelector(({authReducer}: any) => authReducer);

  const [walletTransaction, {isLoading}] = useWalletTransactionMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getTransactionHistory = async () => {
    try {
      const transactionResponse = await walletTransaction({
        userid: userInfo[0]?.userid,
        gateway,
      }).unwrap();

      if (transactionResponse[0]?.status === 1) {
        setTransHistory(transactionResponse[0]?.data);
        showToast({
          type: 'success',
          text1: transactionResponse[0]?.message,
        });
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

  const renderItem = ({item}: any) => {
    return <AppCollapse item={item} />;
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
          <DashBoardHeaderComponent title={'Transaction '} back />
          <Text style={styles.titleTxt}>Wallet Transaction History</Text>
          <Text style={styles.subtitleTxt}>Details of transaction</Text>
          <FlatList
            data={transHistory}
            renderItem={renderItem}
            style={styles.flatListCotent}
            contentContainerStyle={{paddingBottom: 25}}
            showsVerticalScrollIndicator={false}
          />
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
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    paddingRight: 5,
    borderRadius: 15,
    marginTop: 20,
    paddingTop: 10,
    paddingBottom: 15,
    borderRightWidth: 10,
    marginLeft: 16,
    marginRight: 16,
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
  flatListCotent: {
    // marginBottom: 150,
  },
  flatListColumn: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
});

export default TransactionHistoryComponent;
