/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {PlatformPressable} from '@react-navigation/elements';
import {StyleSheet, Platform, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {getStorage, localStorageKey} from '../utils/common';
import Toast from 'react-native-toast-message';
import {useLinkBuilder, useTheme} from '@react-navigation/native';
import ProductsComponent from '../ScreenComponents/DashBoardScreens/Products/ProductsComponent';
import ReferalComponent from '../ScreenComponents/DashBoardScreens/Referal/ReferalComponent';
import NewsComponent from '../ScreenComponents/DashBoardScreens/News/NewsComponent';
import ProfileComponent from '../ScreenComponents/DashBoardScreens/Profile/ProfileComponent';
import WalletComponent from '../ScreenComponents/DashBoardScreens/Wallet/WalletComponent';
import {colors} from '../utils/colors';
import LinearGradient from 'react-native-linear-gradient';
import {Image} from 'react-native';
import {fontFamily} from '../utils/appStyles';
import OrderDetailComponent from '../ScreenComponents/DashBoardScreens/OrderDetailComponent';
import TransactionsComponent from '../ScreenComponents/DashBoardScreens/TransactionsComponent';
import ChangePasswordComponent from '../ScreenComponents/DashBoardScreens/Profile/ChangePasswordComponent';
import QRCodeComponent from '../ScreenComponents/DashBoardScreens/QRPayment/QRCodeComponent';
import PaymentComponent from '../ScreenComponents/DashBoardScreens/QRPayment/PaymentComponent';
import TransactionHistoryComponent from '../ScreenComponents/DashBoardScreens/Wallet/TransactionHistoryComponent';
import SubCategoryComponent from '../ScreenComponents/DashBoardScreens/Products/SubCategoryComponent';

const ProductsStack = createNativeStackNavigator<any>();

const WalletStackNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="WALLET">
      <ProductsStack.Screen name="WALLET" component={WalletComponent} />
      <ProductsStack.Screen
        name="TRANS_HISTORY"
        component={TransactionHistoryComponent}
      />
      <ProductsStack.Screen name="QRCODE" component={QRCodeComponent} />
      <ProductsStack.Screen name="PAYMENT" component={PaymentComponent} />
    </ProductsStack.Navigator>
  );
};

const ReferalStackNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="REFERAL">
      <ProductsStack.Screen name="REFERAL" component={ReferalComponent} />
    </ProductsStack.Navigator>
  );
};

const ProductsStackNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PRODUCTS">
      <ProductsStack.Screen name="PRODUCTS" component={ProductsComponent} />
      <ProductsStack.Screen name="SUB_CATEGORY" component={SubCategoryComponent} />
    </ProductsStack.Navigator>
  );
};

const NewsStackNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="NEWS">
      <ProductsStack.Screen name="NEWS" component={NewsComponent} />
    </ProductsStack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <ProductsStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PROFILE">
      <ProductsStack.Screen name="PROFILE" component={ProfileComponent} />
      <ProductsStack.Screen
        name="CHANGE_PWD"
        component={ChangePasswordComponent}
      />
      <ProductsStack.Screen name="PAYMENT" component={PaymentComponent} />
      <ProductsStack.Screen name="QRCODE" component={QRCodeComponent} />
    </ProductsStack.Navigator>
  );
};

const Tab = createBottomTabNavigator<any>();

const DashBoardTabBar = ({state, descriptors, navigation}: any) => {
  const {buildHref} = useLinkBuilder();

  return (
    <LinearGradient colors={['#9b6ec6', '#b386dc', '#c79bef']}>
      <View style={styles.bottomView}>
        {state.routes.map((route: any, index: number) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          let icon = {
            unSelected: require('../assets/products.png'),
            selected: require('../assets/products_white.png'),
          };
          switch (route.name) {
            case 'Wallet':
              icon = {
                unSelected: require('../assets/wallet.png'),
                selected: require('../assets/wallet_white.png'),
              };
              break;
            case 'Referal':
              icon = {
                unSelected: require('../assets/referal.png'),
                selected: require('../assets/referal_white.png'),
              };
              break;
            case 'Merchant':
              icon = {
                unSelected: require('../assets/products.png'),
                selected: require('../assets/products_white.png'),
              };
              break;
            case 'News':
              icon = {
                unSelected: require('../assets/news.png'),
                selected: require('../assets/products_white.png'),
              };
              break;
            case 'Profile':
              icon = {
                unSelected: require('../assets/profile.png'),
                selected: require('../assets/profile_white.png'),
              };
              break;
          }

          return (
            <PlatformPressable
              href={buildHref(route.name, route.params)}
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarButtonTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.bottomTab}>
              {isFocused ? (
                <LinearGradient
                  colors={['#4b0892', '#853b92']}
                  style={styles.selectedBack}>
                  <Image source={icon?.selected} style={styles.icon} />
                </LinearGradient>
              ) : (
                <Image
                  source={icon?.unSelected}
                  style={[styles.icon, styles.iconunSelected]}
                />
              )}
              <Text style={styles.labelTxt}>{label}</Text>
            </PlatformPressable>
          );
        })}
      </View>
    </LinearGradient>
  );
};

const DashboardBottomNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <DashBoardTabBar {...props} />}
      screenOptions={({route}) => ({
        headerShown: false,
      })}>
      <Tab.Screen name="Wallet" component={WalletStackNavigator} />
      <Tab.Screen name="Referal" component={ReferalStackNavigator} />
      <Tab.Screen name="Merchant" component={ProductsStackNavigator} />
      <Tab.Screen name="News" component={NewsStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default DashboardBottomNavigator;

const styles = StyleSheet.create({
  bottomTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 70,
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  bottomView: {
    flexDirection: 'row',
  },
  icon: {
    width: 25,
    height: 20,
  },
  iconunSelected: {
    marginTop: 15,
  },
  labelTxt: {
    color: '#1a0134',
    fontSize: 12,
    marginTop: 3,
    fontFamily: fontFamily.poppins_semi_bold,
    marginBottom: 8,
  },
  selectedBack: {
    height: 32,
    width: 32,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
});
