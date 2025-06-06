import React from 'react';
import {ImageBackground, Text} from 'react-native';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/colors';
import {useNavigation} from '@react-navigation/native';
import {fontFamily} from '../utils/appStyles';
import {Ionicons} from '../utils/IconUtils';
import ZhopperLogo from '../assets/zhopper_logo.svg';

const HeaderComponent = ({title, subTitle, screen}: any) => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require('../assets/heade_banner.png')}
      style={styles.imageContainer}>
      <View style={styles.topHeaderView}>
        {!screen && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtnView}>
            <Ionicons name="arrow-back" size={20} />
          </TouchableOpacity>
        )}
        <View style={styles.logoView}>
          <ZhopperLogo style={styles.logoIcon} />
        </View>
      </View>

      <View style={[styles.viewContainer, screen && styles.screenTrueView]}>
        <Text style={styles.titleTxt}>{title}</Text>
        <Text style={styles.subTitleTxt}>{subTitle}</Text>
      </View>
    </ImageBackground>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  topHeaderView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backBtnView: {
    backgroundColor: colors.white,
    borderRadius: 100,
    padding: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 10,
  },
  logoView: {
    marginTop: 10,
    marginRight: 10,
    alignSelf: 'flex-end',
    flex: 1,
  },
  logoIcon: {
    alignSelf: 'flex-end',
  },
  screenTrueView: {
    marginTop: 50,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  viewContainer: {
    alignItems: 'center',
    flex: 1,
  },
  titleTxt: {
    fontSize: 28,
    color: colors.white,
    fontFamily: fontFamily.poppins_semi_bold,
  },
  subTitleTxt: {
    fontSize: 16,
    color: colors.white,
    fontFamily: fontFamily.poppins_medium,
  },
});
