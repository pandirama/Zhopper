/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react-native/no-inline-styles */
import React, {memo, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {fontFamily} from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import Carousel from 'react-native-reanimated-carousel';
import _ from 'lodash';
import {Feather} from '../../../utils/IconUtils';
import MapView, {Marker} from 'react-native-maps';

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

const ProductHeaderComponent = ({
  fullname,
  currentLocation,
  merchantMarkers,
  getSeachMerchantLocation,
  getMerchantLocations,
  setSearchTerm,
  searchTerm,
}: any) => {
  const [activeDot, setActiveDot] = useState(1);

  let mapView = useRef<MapView>();

  const goToCurrentLocation = () => {
    let initialRegion = {...currentLocation};
    initialRegion.latitudeDelta = 0.005;
    initialRegion.longitudeDelta = 0.005;
    mapView?.animateToRegion(initialRegion, 2000);
  };

  useEffect(() => {
    goToCurrentLocation();
  }, [currentLocation]);

  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          marginLeft: 15,
          marginTop: 5,
          marginRight: 15,
        }}>
        <Image source={require('../../../assets/person.png')} />
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
              fontWeight: 700,
              color: colors.black,
            }}>
            {fullname}
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
            onSubmitEditing={() => {
              getSeachMerchantLocation();
            }}
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
        <View style={styles.map}>
          <MapView
            style={styles.map}
            zoomEnabled={true}
            ref={ref => {
              mapView = ref;
            }}
            showsUserLocation={true}
            onMapReady={goToCurrentLocation}
            loadingEnabled
            region={currentLocation}>
            <Marker
              coordinate={{
                latitude: currentLocation?.latitude,
                longitude: currentLocation?.latitude,
              }}
              pinColor={'green'}
            />
            {merchantMarkers?.map((item: any, index: number) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: (item && parseInt(item?.latitude, 10)) ?? 0,
                  longitude: (item && parseInt(item?.longitude, 10)) ?? 0,
                }}
                pinColor={'purple'}
              />
            ))}
          </MapView>
        </View>

        <TouchableOpacity
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
          }}
          onPress={() => {
            getMerchantLocations();
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
        </TouchableOpacity>
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
    </View>
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

export default memo(ProductHeaderComponent);
