/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
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
import Feather from 'react-native-vector-icons/Feather';
import Carousel from 'react-native-reanimated-carousel';
import _ from 'lodash';

const categories = [
  {
    categoryname: 'Men',
    icon: require('../../../assets/men_category.png'),
  },
  {
    categoryname: 'Women',
    icon: require('../../../assets/women_category.png'),
  },
  {
    categoryname: 'Kids',
    icon: require('../../../assets/kids_category.png'),
  },
  {
    categoryname: 'Eatery',
    icon: require('../../../assets/eatery_category.png'),
  },
  {
    categoryname: 'Gadgets',
    icon: require('../../../assets/gadgets_category.png'),
  },
  {
    categoryname: 'Bags',
    icon: require('../../../assets/bags_category.png'),
  },
  {
    categoryname: 'Interior',
    icon: require('../../../assets/interior_category.png'),
  },
  {
    categoryname: 'Appliances',
    icon: require('../../../assets/appliances_category.png'),
  },
];

type PaginateProp = {
  count: number;
  active: number;
};

const {width} = Dimensions.get('window');

const slideContent: any = [
  {
    icon: require('../../../assets/merchant_offer.png'),
  },
  {
    icon: require('../../../assets/merchant_offer.png'),
  },
  {
    icon: require('../../../assets/merchant_offer.png'),
  },
  {
    icon: require('../../../assets/merchant_offer.png'),
  },
];

const PaginationDots = (props: PaginateProp) => {
  return (
    <View style={styles.dotContainer}>
      {_.map(new Array(props.count), (_val: any, index: any) => (
        <View
          style={[
            {padding: 5, backgroundColor: colors.white},
            index === 0 && {
              borderTopLeftRadius: 25,
              borderBottomLeftRadius: 25,
            },
            index + 1 === props.count && {
              borderTopRightRadius: 25,
              borderBottomRightRadius: 25,
            },
          ]}>
          {index + 1 === props.active ? (
            <View style={styles.activeDot} />
          ) : (
            <View key={index + 1} style={styles.dot} />
          )}
        </View>
      ))}
    </View>
  );
};

const ProductsComponent = () => {
  const [activeDot, setActiveDot] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          padding: 5,
          flex: 1,
        }}>
        <Image source={item?.icon} style={{width: 80, height: 80}} />

        <Text
          style={{
            textAlign: 'center',
            fontFamily: fontFamily.poppins_semi_bold,
            fontSize: 14,
            marginTop: 5,
            color: colors.black,
          }}>
          {item?.categoryname}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView style={appStyles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={{
              flexDirection: 'row',
              marginLeft: 15,
              marginTop: 25,
              marginRight: 15,
            }}>
            <Image source={require('../../../assets/merchant_profile.png')} />
            <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>
              <Text
                style={{
                  fontFamily: fontFamily.poppins_medium,
                  fontSize: 12,
                  marginLeft: 5,
                  color: colors.black,
                }}>
                Welcome Back
              </Text>
              <Text
                style={{
                  fontFamily: fontFamily.poppins_semi_bold,
                  fontSize: 14,
                  marginLeft: 5,
                  color: colors.black,
                }}>
                JR Rosy
              </Text>
            </View>
            <View
              style={{
                borderRadius: 100,
                padding: 5,
                backgroundColor: '#d19fff',
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Feather name="bell" color={colors.black} size={25} />
            </View>
          </View>
          <View style={styles.searchView}>
            <View style={styles.searchContainer}>
              <Feather name="search" color={'#b2b2b2'} size={20} />
              <TextInput
                style={styles.input}
                placeholder="Search  Fashion Accessories...."
                placeholderTextColor="#A9A9A9"
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
              />
            </View>
            <TouchableOpacity
              style={{
                borderRadius: 100,
                padding: 5,
                backgroundColor: '#d19fff',
                width: 45,
                height: 45,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 5,
              }}>
              <Image
                source={require('../../../assets/filter_icon.png')}
                style={{width: 30, height: 30}}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginTop: 20,
            }}>
            <Image
              source={require('../../../assets/merchant_map.png')}
              resizeMode="cover"
            />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#d19fff',
                borderRadius: 25,
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                position: 'absolute',
                bottom: 0,
                right: 18,
              }}>
              <Image source={require('../../../assets/location_map.png')} />
              <Text
                style={{
                  fontFamily: fontFamily.poppins_semi_bold,
                  fontSize: 12,
                  marginLeft: 5,
                  color: colors.black,
                }}>
                Explore Nearby Places
              </Text>
            </View>
          </View>

          <View style={styles.caroselContainer}>
            <Carousel
              width={width}
              height={180}
              loop={false}
              data={slideContent}
              scrollAnimationDuration={1000}
              onProgressChange={(_, absoluteProgress) => {
                setActiveDot(Math.round(absoluteProgress) + 1);
              }}
              renderItem={({index}) => (
                <View style={styles.carouselContainer}>
                  <View style={styles.pageDotView}>
                    <Image source={slideContent[index].icon} />
                  </View>
                </View>
              )}
            />
            <PaginationDots count={4} active={activeDot} />
          </View>
          <View style={{marginLeft: 15, marginTop: 15}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: fontFamily.poppins_semi_bold,
                  fontSize: 18,
                  marginLeft: 5,
                  flex: 1,
                  color: colors.black,
                }}>
                Categories
              </Text>
              <TouchableOpacity style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontFamily: fontFamily.poppins_medium,
                    fontSize: 14,
                    marginRight: 2,
                    color: '#3f00a1',
                  }}>
                  See All
                </Text>
                <Feather
                  name="arrow-up-right"
                  color={'#3f00a1'}
                  size={20}
                  style={{marginRight: 15}}
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={categories}
              renderItem={renderItem}
              numColumns={4}
              columnWrapperStyle={styles.flatListColumn}
              contentContainerStyle={styles.flatListCotent}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  flatListCotent: {
    marginBottom: 15,
    marginTop: 10,
  },
  flatListColumn: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  caroselContainer: {
    marginTop: 25,
  },
  carouselContainer: {
    justifyContent: 'center',
  },
  pageDotView: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    height: 8,
    width: 8,
    borderRadius: 100,
    backgroundColor: colors.gray1,
  },
  activeDot: {
    height: 8,
    width: 8,
    borderRadius: 100,
    backgroundColor: colors.black,
  },
  searchView: {
    flexDirection: 'row',
    marginLeft: 15,
    marginRight: 10,
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgColor,
    borderRadius: 25, // Adjust the value to change the roundness
    paddingHorizontal: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray1,
  },
  input: {
    width: '79%',
    paddingVertical: 15,
    color: colors.black,
  },
});

export default ProductsComponent;
