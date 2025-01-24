/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Image, Text} from 'react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/colors';
import {fontFamily} from '../utils/appStyles';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch} from '../store';
import {authAction} from '../reducer/auth/authSlice';
import { Ionicons, MaterialCommunityIcons } from '../utils/IconUtils';
import { clearStorage } from '../utils/common';

const DashBoardHeaderComponent = ({title, navigation, back}: any) => {
  const dispatch = useAppDispatch();
  const onLogout = () => {
    clearStorage();
    dispatch(authAction.logout());
  };

  return (
    <LinearGradient
      colors={['#9b6ec6', '#b386dc', '#c79bef']}
      style={styles.container}>
      <View style={styles.subContainer}>
        {back ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtnView}>
            <Ionicons name="arrow-back" size={20} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.logoutTouch}
            onPress={() => onLogout()}>
            <LinearGradient
              colors={['#4b0892', '#853b92']}
              style={styles.logout}>
              <MaterialCommunityIcons
                name="logout"
                color={colors.white}
                size={20}
                style={{marginLeft: 3}}
              />
            </LinearGradient>
          </TouchableOpacity>
        )}

        <Text style={styles.titleTxt}>{title}</Text>
        <Image source={require('../assets/logo.png')} style={styles.icon} />
      </View>
    </LinearGradient>
  );
};

export default DashBoardHeaderComponent;

const styles = StyleSheet.create({
  container: {
    height: 60,
    justifyContent: 'center',
    width: '100%',
  },
  subContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleTxt: {
    color: colors.white,
    fontSize: 16,
    flex: 1,
    fontFamily: fontFamily.poppins_semi_bold,
    marginLeft: 5,
    textAlignVertical: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  logout: {
    height: 35,
    width: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutTouch: {
    marginLeft: 10,
  },
  backBtnView: {
    backgroundColor: colors.white,
    borderRadius: 100,
    padding: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
});
