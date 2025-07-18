/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Linking,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import LinearGradient from 'react-native-linear-gradient';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
import {Ionicons} from '../../../utils/IconUtils';
import {useTranslation} from 'react-i18next';

type Props = NativeStackScreenProps<any, 'MERCHANT_INFO'>;

export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = 0.0421;

export const MerchantInfoComponent = ({route}: Props) => {
  const {merchantID} = route?.params ?? {};
  const {t} = useTranslation();
  const {showToast, toggleBackdrop} = useCommon();

  const actionSheetRef = useRef<ActionSheetRef>(null);

  let mapView: any = useRef<MapView>(null);

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

  const openMap = (lat: any, lng: any, label: any, type: string) => {
    const scheme = Platform.select({
      ios: `maps://?q=${label}&ll=${lat},${lng}`,
      android: `geo:${lat},${lng}?q=${lat},${lng}(${label})`,
    });

    console.log(scheme);
    const appURL = `waze://?ll=${lat},${lng}&navigate=yes`;
    const webURL = `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`;

    if (scheme && type === 'Google') {
      Linking.openURL(scheme).catch(() => {
        showToast({
          type: 'error',
          text1: 'Please try Again',
        });
      });
    } else if ((appURL || webURL) && type === 'Waze') {
      Linking.openURL(appURL).catch(() => {
        Linking.openURL(webURL).catch(() => {
          showToast({
            type: 'error',
            text1: 'Please try Again',
          });
        });
      });
    }
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
                <Text style={styles.titleTxt}>{`${t('COUNTRY')} :`}</Text>
                <Text style={styles.subTitleTxt}>{merchantInfo?.Country}</Text>
              </View>
              <View
                style={{
                  marginTop: 10,
                  marginBottom: 10,
                  marginLeft: 10,
                  marginRight: 10,
                }}>
                <Text style={styles.titleTxt}>{`${t('DESCRIPTION')} :`}</Text>
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
                <>
                  <View style={styles.map}>
                    <MapView
                      style={styles.map}
                      zoomEnabled={true}
                      ref={(ref: any) => {
                        mapView = ref;
                      }}
                      toolbarEnabled={true}
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
                  <TouchableOpacity
                    onPress={() => {
                      actionSheetRef?.current?.show();
                    }}
                    style={styles.tabTouch}>
                    <LinearGradient
                      colors={['#853b92', '#4b0892']}
                      style={styles.tabBtn}>
                      <Text style={styles.tabTxt}>Open Map</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              )}
            </ScrollView>
          </View>
        </View>
        <ActionSheet
          ref={actionSheetRef}
          containerStyle={styles.actionContainer}
          closeOnPressBack={false}
          closeOnTouchBackdrop={false}
          onClose={() => {
            actionSheetRef?.current?.hide();
          }}>
          <View style={styles.actionViewContainer}>
            <View style={styles.actionTitleView}>
              <Text style={styles.actionTitleTxt}>Navigate</Text>
              <TouchableOpacity
                onPress={() => {
                  actionSheetRef?.current?.hide();
                }}>
                <Ionicons name={'close'} size={20} color={'#333333'} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.borderView} />
          <View style={{padding: 12}}>
            <TouchableOpacity
              style={{flexDirection: 'row', padding: 15}}
              onPress={() => {
                actionSheetRef?.current?.hide();
                openMap(
                  parseFloat(merchantInfo?.latitude),
                  parseFloat(merchantInfo?.longitude),
                  merchantInfo['Shop Name'],
                  'Google',
                );
              }}>
              <Ionicons
                name={'navigate-outline'}
                size={22}
                color={colors.black}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#333333',
                  flex: 1,
                  marginLeft: 15,
                }}>
                {Platform.OS === 'ios' ? 'Apple Maps App' : 'Google Maps App'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', padding: 15}}
              onPress={() => {
                actionSheetRef?.current?.hide();
                openMap(
                  parseFloat(merchantInfo?.latitude),
                  parseFloat(merchantInfo?.longitude),
                  merchantInfo['Shop Name'],
                  'Waze',
                );
              }}>
              <Ionicons
                name={'navigate-outline'}
                size={22}
                color={colors.black}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#333333',
                  flex: 1,
                  marginLeft: 15,
                }}>
                Waze App
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row', padding: 15}}
              onPress={() => actionSheetRef?.current?.hide()}>
              <Ionicons name={'close'} size={22} color={colors.black} />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: '#333333',
                  flex: 1,
                  marginLeft: 15,
                }}>
                {t('CANCEL')}
              </Text>
            </TouchableOpacity>
          </View>
        </ActionSheet>
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
  tabTouch: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  tabBtn: {
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    width: 125,
  },
  tabTxt: {
    color: colors.white,
    fontSize: 12,
    textAlign: 'center',
    fontFamily: fontFamily.poppins_semi_bold,
  },
  actionContainer: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#FFFFFF',
    paddingBottom: 25,
  },
  actionTitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    marginLeft: 12,
    marginRight: 12,
    marginBottom: 10,
  },
  actionTitleTxt: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
    fontWeight: 600,
  },
  actionViewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  borderView: {
    borderWidth: 0.5,
    borderColor: colors.gray1,
  },
});

export default MerchantInfoComponent;
