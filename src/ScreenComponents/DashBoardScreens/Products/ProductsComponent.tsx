/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import {Feather} from '../../../utils/IconUtils';
import {
  useGetCategoriesQuery,
  useMerchantLocationsMutation,
  useSearchMerchantLocationsMutation,
} from '../../../api/productsAPI';
import {useFocusEffect} from '@react-navigation/native';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import {useSelector} from 'react-redux';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Geolocation from '@react-native-community/geolocation';
import {PERMISSIONS, request} from 'react-native-permissions';
import {
  isLocationEnabled,
  promptForEnableLocationIfNeeded,
} from 'react-native-android-location-enabler';
import ProductHeaderComponent from './ProductHeaderComponent';

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

const ProductsComponent = ({navigation}: Props) => {
  const {showToast, toggleBackdrop} = useCommon();
  const [searchTerm, setSearchTerm] = useState('');

  const [categories, setCategories] = useState<any>(null);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [merchantMarkers, setMerchantMarkers] = useState<any>(null);

  const {userProfile} = useSelector(({profileReducer}: any) => profileReducer);

  const {isFetching, refetch} = useGetCategoriesQuery();

  const [merchantLocations, {isLoading}] = useMerchantLocationsMutation();

  const [searchMerchantLocations, {isLoading: isSearchLoading}] =
    useSearchMerchantLocationsMutation();

  useEffect(() => {
    toggleBackdrop(isFetching || isLoading || isSearchLoading);
  }, [isFetching || isLoading || isSearchLoading]);

  const requestLocationPermission = async () => {
    return request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_ALWAYS
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    ).then(result => {
      return result;
    });
  };

  const getSeachMerchantLocation = async () => {
    try {
      const params = {
        search: searchTerm,
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude,
      };

      const response: any = await searchMerchantLocations(params).unwrap();
      if (response[0]?.status === 1) {
        setMerchantMarkers(response[0]?.data);
      } else {
        setSearchTerm('');
        showToast({
          type: 'error',
          text1: response[0]?.message,
        });
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  const getMerchantLocations = async (locations: any) => {
    try {
      const params = {
        latitude: locations?.latitude,
        longitude: locations?.longitude,
      };

      const response: any = await merchantLocations(params).unwrap();
      if (response[0]?.status === 1) {
        setMerchantMarkers(response[0]?.data);
      } else {
        showToast({
          type: 'error',
          text1: response[0]?.message,
        });
      }
    } catch (err: any) {
      showToast({
        type: 'error',
        text1: getErrorMessage(err),
      });
    }
  };

  const getUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const region = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          latitudeDelta: 5,
          longitudeDelta: 5,
        };
        setCurrentLocation(region);
        getMerchantLocations(region);
      },
      error => {
        console.warn(error.code, error.message);
        handleCheckPressed();
      },
      {enableHighAccuracy: false, timeout: 15000},
    );
  };

  const handleCheckPressed = async () => {
    if (Platform.OS === 'android') {
      const checkEnabled: boolean = await isLocationEnabled();
      if (!checkEnabled) {
        try {
          const enableResult = await promptForEnableLocationIfNeeded();
          if (enableResult === 'enabled') {
            getUserLocation();
          }
        } catch (error: unknown) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      }
    }
  };

  const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      if (res === 'granted') {
        getUserLocation();
      }
    });
  };

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
      getLocation();
      return () => {};
    }, []),
  );

  const renderItem = ({item, index}: any) => {
    if (index > 7) {
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

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView
        style={[appStyles.container, {backgroundColor: colors.background}]}
        edges={['right', 'left', 'top']}>
        <View style={appStyles.headerContainer}>
          <DashBoardHeaderComponent title={'Categories'} />
          <FlatList
            data={categories}
            renderItem={renderItem}
            numColumns={4}
            showsVerticalScrollIndicator={false}
            columnWrapperStyle={styles.flatListColumn}
            contentContainerStyle={styles.flatListCotent}
            ListHeaderComponent={
              <>
                <ProductHeaderComponent
                  fullname={userProfile?.fullname}
                  currentLocation={currentLocation}
                  merchantMarkers={merchantMarkers}
                  getSeachMerchantLocation={getSeachMerchantLocation}
                  getMerchantLocations={getMerchantLocations}
                  setSearchTerm={setSearchTerm}
                  searchTerm={searchTerm}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    marginLeft: 10,
                    marginRight: 10,
                  }}>
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
                    onPress={() =>
                      navigation.navigate('SEE_ALL_CATEGORY', {
                        categories: categories,
                      })
                    }>
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
              </>
            }
            removeClippedSubviews={false}
            keyExtractor={(item, index) => 'key' + index}
          />
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
  map: {
    width: Dimensions.get('window').width / 1.07,
    height: 200,
    alignSelf: 'center',
    borderRadius: 10,
  },
});

export default ProductsComponent;
