/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Image, Text} from 'react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/colors';
import {fontFamily} from '../utils/appStyles';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch} from '../store';
import {authAction} from '../reducer/auth/authSlice';
import {Ionicons, MaterialCommunityIcons} from '../utils/IconUtils';
import {clearStorage} from '../utils/common';
import ModalComponent from './ModalComponent';
import {useNavigation} from '@react-navigation/native';

const DashBoardHeaderComponent = ({title, back, onBackPress}: any) => {
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const onLogout = async () => {
    setIsVisible(true);
  };

  const onDismiss = () => {
    setIsVisible(false);
  };

  const onConfirm = async () => {
    setIsVisible(false);
    await clearStorage();
    dispatch(authAction.logout());
  };

  const navigation = useNavigation();

  const backBtnEvent = () => {
    if (onBackPress) {
      onBackPress();
      return;
    }
    navigation.goBack();
  };

  return (
    <LinearGradient
      colors={['#9b6ec6', '#b386dc', '#c79bef']}
      style={styles.container}>
      <View style={styles.subContainer}>
        {back && (
          <TouchableOpacity
            onPress={() => {
              backBtnEvent();
            }}
            style={styles.backBtnView}>
            <Ionicons name="arrow-back" size={20} />
          </TouchableOpacity>
        )}
        {!back && (
          <Image source={require('../assets/logo.png')} style={styles.icon} />
        )}

        <Text style={styles.titleTxt}>{title}</Text>
        <TouchableOpacity style={styles.logoutTouch} onPress={() => onLogout()}>
          <LinearGradient colors={['#4b0892', '#853b92']} style={styles.logout}>
            <MaterialCommunityIcons
              name="logout"
              color={colors.white}
              size={20}
              style={{marginLeft: 3}}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <ModalComponent
        visibility={isVisible}
        onDismiss={onDismiss}
        onConfirm={onConfirm}
      />
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
    marginLeft: 10,
  },
  logout: {
    height: 35,
    width: 35,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutTouch: {
    marginRight: 10,
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
