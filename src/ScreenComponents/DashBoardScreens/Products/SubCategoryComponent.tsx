/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
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
import {useGetSubCategoryMutation} from '../../../api/productsAPI';
import {useFocusEffect} from '@react-navigation/native';
import useCommon from '../../../hooks/useCommon';
import {getErrorMessage} from '../../../utils/common';
import DashBoardHeaderComponent from '../../../components/DashBoardHeaderComponent';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, 'SUB_CATEGORY'>;

const SubCategoryComponent = ({route, navigation}: Props) => {
  const {subCategory} = route?.params ?? {};
  const {showToast, toggleBackdrop} = useCommon();

  const [categories, setCategories] = useState<any>(null);

  const [getSubCategory, {isLoading}] = useGetSubCategoryMutation();

  useEffect(() => {
    toggleBackdrop(isLoading);
  }, [isLoading]);

  const getSubCategories = async () => {
    try {
      const categoryResponse = await getSubCategory({
        category: subCategory,
      }).unwrap();
      if (categoryResponse[0]?.status === 1) {
        showToast({
          type: 'success',
          text1: categoryResponse[0]?.message,
        });
        if (categoryResponse[0]?.message !== 'N/A') {
          setCategories(categoryResponse[0]?.data[0]?.list);
        }
      } else {
        showToast({
          type: 'error',
          text1: categoryResponse[0]?.message,
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
      getSubCategories();
      return () => {};
    }, []),
  );

  const renderCategoryItem = ({item}: any) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingTop: 15,
          paddingBottom: 15,
          borderBottomWidth: 0.5,
          borderBottomColor: colors.gray1,
        }}
        onPress={() =>
          navigation.navigate('MERCHANT_INFO', {
            merchantID: item?.merchant_id,
          })
        }>
        <Text
          style={{
            fontFamily: fontFamily.poppins_bold,
            fontSize: 15,
            color: colors.black,
            flex: 1,
            paddingLeft: 20,
          }}>
          {item['Merchant Name']}
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
        style={appStyles.container}
        edges={['right', 'left', 'top']}>
        <View style={appStyles.headerContainer}>
          <DashBoardHeaderComponent title={subCategory} back />
          {categories?.length > 0 && (
            <View style={[appStyles.boxShadow, styles.walletSubContainer]}>
              <FlatList
                data={categories}
                renderItem={renderCategoryItem}
                showsVerticalScrollIndicator={false}
                removeClippedSubviews={false}
                keyExtractor={(item, index) => 'key' + index}
              />
            </View>
          )}
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

export default SubCategoryComponent;
