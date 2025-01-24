/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {navigationRef} from './Root';
import SplashScreen from 'react-native-splash-screen';
import LoginComponent from '../ScreenComponents/AuthScreens/LoginComponent';
import {colors} from '../utils/colors';
import RegisterComponent from '../ScreenComponents/AuthScreens/RegisterComponent';
import ForgotPasswordComponent from '../ScreenComponents/AuthScreens/ForgotPasswordComponent';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '../store';
import {getStorage, localStorageKey} from '../utils/common';
import {authAction} from '../reducer/auth/authSlice';
import SplashComponent from '../Splash/SplashComponent';
import DashboardBottomNavigator from './DashboardBottomNavigator';

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};

const AuthStack = createNativeStackNavigator<any>();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="LOGIN" component={LoginComponent} />
      <AuthStack.Screen name="REGISTER" component={RegisterComponent} />
      <AuthStack.Screen
        name="FORGOT_PASSWORD"
        component={ForgotPasswordComponent}
      />
      <AuthStack.Screen
        name="DASH_BOARD"
        component={DashboardBottomNavigator}
      />
    </AuthStack.Navigator>
  );
};

const MainStack = createNativeStackNavigator<any>();

const MainAppStack = () => {
  const {isAuthenticated} = useSelector(({authReducer}: any) => authReducer);
  return (
    <MainStack.Navigator screenOptions={{headerShown: false}}>
      {isAuthenticated ? (
        <MainStack.Screen
          name="DASH_BOARD"
          component={DashboardBottomNavigator}
        />
      ) : (
        <MainStack.Screen name="AUTH_ROOT" component={AuthStackNavigator} />
      )}
    </MainStack.Navigator>
  );
};

const AppNavigationContainer = (): JSX.Element => {
  const {isInitialized} = useSelector(({authReducer}: any) => authReducer);
  const dispatch = useAppDispatch();

  const initializeApp = async () => {
    const user = await getStorage(localStorageKey.userInfo);
    dispatch(authAction.setInitialize({isAuthenticated: user !== null, user}));
  };

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  useEffect(() => {
    initializeApp();
  }, [isInitialized]);

  if (!isInitialized) {
    return <SplashComponent />;
  }
  return (
    <NavigationContainer theme={defaultTheme} ref={navigationRef}>
      <MainAppStack />
    </NavigationContainer>
  );
};

export default AppNavigationContainer;
