/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import appStyles, {fontFamily} from '../../../utils/appStyles';
import {colors} from '../../../utils/colors';
import {Ionicons} from '../../../utils/IconUtils';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'SEE_ALL_CATEGORY'>;

const SeeAllCategoryComponent = ({route, navigation}: Props) => {
  const {categories} = route?.params ?? {};

  const renderAllCategory = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          flex: 1,
          flexDirection: 'row',
          paddingTop: 15,
          paddingBottom: 15,
          alignItems: 'center',
        }}
        onPress={() =>
          navigation.navigate('SUB_CATEGORY', {
            subCategory: item?.name,
          })
        }>
        <Image
          source={{uri: item?.icon}}
          style={{width: 50, height: 50, borderRadius: 10, marginLeft: 15}}
        />
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

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent={true}
        backgroundColor={colors.background}
        animated
      />
      <SafeAreaView
        style={[appStyles.container, {backgroundColor: colors.status}]}
        edges={['right', 'left', 'top']}>
        <View style={appStyles.headerContainer}>
          <DashBoardHeaderComponent title={'Categories'} back />
          <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
            <FlatList
              data={categories}
              showsVerticalScrollIndicator={false}
              renderItem={renderAllCategory}
              removeClippedSubviews={false}
              keyExtractor={(item, index) => 'key' + index}
              ItemSeparatorComponent={() => {
                return <View style={styles.borderView} />;
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  walletSubContainer: {
    backgroundColor: colors.white,
    borderRadius: 15,
    marginTop: 10,
    paddingTop: 10,
    marginLeft: 10,
    marginRight: 10,
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

export default SeeAllCategoryComponent;
