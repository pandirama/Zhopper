/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import {useGetMerchantInfoMutation} from '../../../api/productsAPI';
import {useFocusEffect} from '@react-navigation/native';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import MapView, {Marker} from 'react-native-maps';

type Props = NativeStackScreenProps<any, 'MERCHANT_INFO'>;

export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = 0.0421;

const MerchantInfoComponent = ({route}: Props) => {
  const {merchantID} = route?.params ?? {};
  const {showToast, toggleBackdrop} = useCommon();

  let mapView = useRef<MapView>(null);

  const [merchantInfo, setMerchantInfo] = useState<any>([]);

  const [getMerchantInfo, {isLoading}] = useGetMerchantInfoMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getMerchantInfos = async () => {
    try {
      const merchantResponse = await getMerchantInfo({
        userid: merchantID,
      }).unwrap();
      if (merchantResponse[0]?.status === 1) {
        setMerchantInfo(merchantResponse[0]?.data[0]);
      } else {
        showToast({
          type: 'error',
          text1: merchantResponse[0]?.message,
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
      getMerchantInfos();
      return () => {};
    }, []),
  );

  const goToCurrentLocation = () => {
    let initialRegion = {...merchantInfo};
    initialRegion.latitude = parseFloat(merchantInfo?.latitude);
    initialRegion.longitude = parseFloat(merchantInfo?.longitude);
    initialRegion.latitudeDelta = 0.005;
    initialRegion.longitudeDelta = 0.005;
    mapView?.animateToRegion(initialRegion, 2000);
  };

  useEffect(() => {
    if (merchantInfo?.latitude && merchantInfo?.longitude) {
      goToCurrentLocation();
    }
  }, [merchantInfo]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView
        style={appStyles.container}
        edges={['right', 'left', 'top']}>
        <View style={appStyles.headerContainer}>
          <DashBoardHeaderComponent
            back
            title={merchantInfo['Merchant Name']}
          />

          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{paddingBottom: 20}}>
              <Text style={styles.headerTxt}>Merchant Details</Text>
              <View style={styles.titleView}>
                <Text style={styles.titleTxt}>Merchant Name :</Text>
                <Text style={styles.subTitleTxt}>
                  {merchantInfo['Merchant Name']}
                </Text>
              </View>
              <View style={styles.titleView}>
                <Text style={styles.titleTxt}>Merchant Email :</Text>
                <Text style={styles.subTitleTxt}>
                  {merchantInfo['Merchant Email']}
                </Text>
              </View>
              <View style={styles.titleView}>
                <Text style={styles.titleTxt}>Merchant Phone No. :</Text>
                <Text style={styles.subTitleTxt}>
                  {merchantInfo['Merchant Phone No.']}
                </Text>
              </View>
              <View style={styles.titleView}>
                <Text style={styles.titleTxt}>Shop Name :</Text>
                <Text style={styles.subTitleTxt}>
                  {merchantInfo['Shop Name']}
                </Text>
              </View>
              <View style={styles.titleView}>
                <Text style={styles.titleTxt}>Country :</Text>
                <Text style={styles.subTitleTxt}>{merchantInfo?.Country}</Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text style={styles.titleTxt}>Description :</Text>
                <Text style={styles.subTitleTxt}>
                  {merchantInfo?.description}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text style={styles.titleTxt}>Address :</Text>
                <Text style={styles.subTitleTxt}>{merchantInfo?.Address}</Text>
              </View>
              {merchantInfo?.latitude && merchantInfo?.longitude && (
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
                    region={{
                      latitude: parseFloat(merchantInfo?.latitude),
                      longitude: parseFloat(merchantInfo?.longitude),
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}>
                    <Marker
                      coordinate={{
                        latitude: parseFloat(merchantInfo?.latitude),
                        longitude: parseFloat(merchantInfo?.longitude),
                      }}
                      title={merchantInfo['Shop Name']}
                      pinColor={'purple'}
                    />
                  </MapView>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get('window').width / 1.2,
    height: 250,
    alignSelf: 'center',
    borderRadius: 10,
  },
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 15,
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    flex: 1,
  },
  titleView: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  titleTxt: {
    fontSize: 18,
    fontWeight: 700,
    fontFamily: fontFamily.poppins_bold,
  },
  subTitleTxt: {
    fontSize: 15,
    fontWeight: 500,
    textAlignVertical: 'center',
    fontFamily: fontFamily.poppins_medium,
    marginLeft: 10,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: 700,
    fontFamily: fontFamily.poppins_bold,
    textAlign: 'center',
    marginBottom: 15,
    marginTop: 15,
  },
});

export default MerchantInfoComponent;
