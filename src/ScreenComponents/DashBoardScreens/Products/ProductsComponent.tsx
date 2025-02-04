/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
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
import Carousel from 'react-native-reanimated-carousel';
import _ from 'lodash';
import {Feather, Ionicons} from '../../../utils/IconUtils';
import {useGetCategoriesQuery} from '../../../api/productsAPI';
import {useFocusEffect} from '@react-navigation/native';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {useSelector} from 'react-redux';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'PRODUCTS'>;

const imageCategories = [
  {
    name: 'Leisure',
    image: require('../../../assets/leisure_category.png'),
  },
  {
    name: 'Grocery',
    image: require('../../../assets/grocery_category.png'),
  },
  {
    name: 'Beauty',
    image: require('../../../assets/beauty_category.png'),
  },
  {
    name: 'Home Care',
    image: require('../../../assets/homecare_category.png'),
  },
  {
    name: 'Professional',
    image: require('../../../assets/professional_category.png'),
  },
  {
    name: 'Education',
    image: require('../../../assets/education_category.png'),
  },
  {
    name: 'General',
    image: require('../../../assets/general_category.png'),
  },
  {
    name: 'Health',
    image: require('../../../assets/health_category.png'),
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

const ProductsComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();
  const [activeDot, setActiveDot] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [seeAll, setSeeAll] = useState<boolean>(false);

  const [categories, setCategories] = useState<any>(null);

  const {userProfile} = useSelector(({profileReducer}: any) => profileReducer);

  const {isFetching, refetch} = useGetCategoriesQuery();

  useEffect(() => {
    toggleBackdrop(isFetching);
  }, [isFetching]);

  useFocusEffect(
    useCallback(() => {
      refetch()
        .then((response: any) => {
          const {data, status, message} = response;
          if (data[0]?.status === 1 && status) {
            const categoryData = data[0]?.data;
            const categoryArray: any = [];
            for (var key in categoryData) {
              if (categoryData.hasOwnProperty(key)) {
                categoryArray.push({name: categoryData[key]});
              }
            }
            setCategories(categoryArray);
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
      return () => {};
    }, []),
  );

  const renderItem = ({item, index}: any) => {
    if (index > 7 && !seeAll) {
      return <></>;
    }
    const findImage = imageCategories.find(imageName => {
      return imageName?.name === item?.name;
    });
    return (
      <TouchableOpacity
        style={{
          alignItems: 'center',
          padding: 5,
          flex: 1,
        }}
        onPress={() =>
          navigation.navigate('SUB_CATEGORY', {
            subCategory: item?.name,
          })
        }>
        <Image
          source={findImage?.image}
          style={{width: 80, height: 80, borderRadius: 10}}
        />

        <Text
          style={{
            textAlign: 'center',
            fontFamily: fontFamily.poppins_semi_bold,
            fontSize: 12,
            marginTop: 5,
            color: colors.black,
          }}>
          {item?.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderAllCategory = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingTop: 15,
          paddingBottom: 15,
        }}
        onPress={() =>
          navigation.navigate('SUB_CATEGORY', {
            subCategory: item?.name,
          })
        }>
        <Text
          style={{
            fontFamily: fontFamily.poppins_bold,
            fontSize: 15,
            color: colors.black,
            flex: 1,
            paddingLeft: 20,
          }}>
          {item?.name}
        </Text>
        <Ionicons
          name={'chevron-forward'}
          size={22}
          color={colors.black}
          style={styles.icon}
        />
      </TouchableOpacity>
    );
  };

  const renderSeeAll = () => {
    return (
      <>
        <DashBoardHeaderComponent onBackPress={() => setSeeAll(false)} back />
        <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
          <FlatList
            data={categories}
            showsVerticalScrollIndicator={false}
            renderItem={renderAllCategory}
            ItemSeparatorComponent={() => {
              return <View style={styles.borderView} />;
            }}
          />
        </View>
      </>
    );
  };

  const ListHeader = () => {
    return (
      <View>
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
              {userProfile?.fullname}
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
        <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 10}}>
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
          <TouchableOpacity
            style={{flexDirection: 'row'}}
            onPress={() => setSeeAll(a => !a)}>
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
      </View>
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
      <SafeAreaView
        style={[
          appStyles.container,
          {backgroundColor: seeAll ? colors.status : colors.background},
        ]}
        edges={['right', 'left', 'top']}>
        <View style={appStyles.headerContainer}>
          {seeAll ? (
            renderSeeAll()
          ) : (
            <FlatList
              data={categories}
              renderItem={renderItem}
              numColumns={4}
              showsVerticalScrollIndicator={false}
              columnWrapperStyle={styles.flatListColumn}
              contentContainerStyle={styles.flatListCotent}
              ListHeaderComponent={<ListHeader />}
            />
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 20,
    paddingTop: 10,
    marginLeft: 16,
    marginRight: 16,
    marginBottom: 70,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
  icon: {
    marginRight: 10,
  },
  flatListCotent: {
    marginBottom: 15,
    marginTop: 10,
    paddingBottom: 25,
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
