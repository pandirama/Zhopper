/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {useGetNewsQuery} from '../../../api/newsAPI';
import {useFocusEffect} from '@react-navigation/native';
import {getErrorMessage} from '../../../utils/common';
import useCommon from '../../../hooks/useCommon';
import {ReadMoreText} from './ReadMoreText';

type Props = NativeStackScreenProps<any, 'NEWS'>;



const NewsComponent = ({}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();

  const [news, setNews] = useState(null);

  const {userProfile} = useSelector(({profileReducer}: any) => profileReducer);

  const {isFetching, refetch} = useGetNewsQuery();

  useEffect(() => {
    toggleBackdrop(isFetching);
  }, [isFetching]);

  const getNewsData = () => {
    refetch()
      .then((response: any) => {
        const {data, message} = response;
        if (data[0]?.status === 1) {
          setNews(data[0]?.data);
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
      getNewsData();
      return () => {};
    }, []),
  );

  const renderItem = ({item}: any) => {
    return (
      <View
        style={{
          marginLeft: 15,
          marginTop: 15,
          marginRight: 15,
          paddingBottom: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 100,
              backgroundColor: '#550f91',
              padding: 5,
              width: 50,
              height: 50,
              marginLeft: 15,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View
              style={{
                borderRadius: 100,
                backgroundColor: '#9e4ef3',
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image source={require('../../../assets/date-icon.png')} />
            </View>
          </View>
          <Text
            style={{
              color: '#000000',
              fontSize: 16,
              marginLeft: 10,
              fontFamily: fontFamily.poppins_semi_bold,
            }}>
            {item?.date}
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
              marginLeft: 5,
              paddingTop: 15,
              paddingLeft: 20,
              paddingBottom: 10,
              marginTop: 10,
            },
          ]}>
          <Text
            style={{
              color: colors.black,
              fontSize: 15,
              fontFamily: fontFamily.poppins_semi_bold,
            }}>
            {item?.title}
          </Text>

          <ReadMoreText text={item?.detail} banner={item?.banner} />
        </View>
      </View>
    );
  };

  const ListHeader = () => {
    return (
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
          <View style={{marginLeft: 10, justifyContent: 'center', flex: 1}}>
            <Text
              style={{
                color: '#310855',
                fontSize: 16,
                fontWeight: 800,
                fontFamily: fontFamily.poppins_semi_bold,
              }}>
              {userProfile?.fullname}
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
          <DashBoardHeaderComponent title={'News'} />
          <FlatList
            data={news}
            renderItem={renderItem}
            style={{marginBottom: 10}}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
            ListHeaderComponent={<ListHeader />}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    marginTop: 20,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
    marginRight: 10,
    paddingLeft: 0,
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

export default NewsComponent;
