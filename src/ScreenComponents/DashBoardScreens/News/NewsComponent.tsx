/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Dimensions,
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

type Props = NativeStackScreenProps<any, 'NEWS'>;

const {width} = Dimensions.get('window');

const clients = [
  {
    icon: require('../../../assets/merchant_offer.png'),
    title: 'Start the Year With 50% off on Foods',
    subTitle:
      'In eget dui augue. Donec id sapien lectus. Maecenas nulla odio, copy',
    date: 'Jan 2025',
  },
  {
    icon: require('../../../assets/pizza_catagories.png'),
    title: '30% off on every deals only this week',
    subTitle:
      'In eget dui augue. Donec id sapien lectus. Maecenas nulla odio, copy 2',
    date: 'Jan 2025',
  },
  {
    icon: require('../../../assets/merchant_offer.png'),
    title: 'Start the Year With 50% off on Foods',
    subTitle:
      'In eget dui augue. Donec id sapien lectus. Maecenas nulla odio, copy',
    date: 'Jan 2025',
  },
  {
    icon: require('../../../assets/pizza_catagories.png'),
    title: '30% off on every deals only this week',
    subTitle:
      'In eget dui augue. Donec id sapien lectus. Maecenas nulla odio, copy 2 In eget dui augue. Donec id sapien lectus. Maecenas nulla odio, copy 2 In eget dui augue. Donec id sapien lectus. Maecenas nulla odio, copy 2',
    date: 'Jan 2025',
  },
  {
    icon: require('../../../assets/merchant_offer.png'),
    title: 'Start the Year With 50% off on Foods',
    subTitle:
      'In eget dui augue. Donec id sapien lectus. Maecenas nulla odio, copy',
    date: 'Jan 2025',
  },
  {
    icon: require('../../../assets/pizza_catagories.png'),
    title: '30% off on every deals only this week',
    subTitle:
      'In eget dui augue. Donec id sapien lectus. Maecenas nulla odio, copy 2',
    date: 'Jan 2025',
  },
];

const NewsComponent = ({}: Props) => {
  const {userProfile} = useSelector(({profileReducer}: any) => profileReducer);

  const renderItem = ({item}: any) => {
    return (
      <View style={{marginLeft: 15, marginTop: 15, marginRight: 15}}>
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

          <Text
            style={{
              color: '#909090',
              fontSize: 13,
              fontFamily: fontFamily.poppins_semi_bold,
            }}
            numberOfLines={3}>
            {item?.subTitle}
          </Text>
          <Text
            style={{
              color: '#5b159d',
              fontSize: 13,
              fontFamily: fontFamily.poppins_bold,
              textDecorationLine: 'underline',
            }}>
            Read More
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 25}}>
          <Image source={item?.icon} />
        </View>
        <View
          style={{
            borderRadius: 100,
            backgroundColor: '#eeecef',
            padding: 5,
            width: 95,
            height: 95,
            marginLeft: 15,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            top: 140,
            left: width / 3.5,
          }}>
          <Image source={require('../../../assets/deal_icon.png')} />
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
            data={clients}
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
