import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../utils/colors';
import { fontFamily } from '../utils/appStyles';

export const GateWayTabs = {
  MyWallet: 'My Wallet',
  CreditCard: 'Credit Card',
  BankTransfer: 'Bank Transfer',
};

const TabPill = ({
  title,
  isActive,
  onSelectItem,
}: {
  title: string;
  isActive?: boolean;
  onSelectItem: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onSelectItem}
      style={[styles.pillContainer, isActive && styles.activePill]}>
      <Text style={[styles.title, isActive && styles.activeTitle]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

type Prop = {
  onSelectItem: (userType: string) => void;
  activeTab: string;
  titles: string[];
};

const CustomTabs = (props: Prop) => {
  const {activeTab, onSelectItem, titles} = props;
  return (
    <View style={styles.tabContainer}>
      {titles?.map((title: string) => {
        return (
          <TabPill
            title={title}
            isActive={activeTab === title}
            onSelectItem={() => onSelectItem(title)}
          />
        );
      })}
    </View>
  );
};

export default CustomTabs;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingVertical: 3,
    backgroundColor: '#EFF2F5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#4d0991',
    width: '98%',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.29)',
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 1,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  pillContainer: {
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 8,
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontFamily:fontFamily.poppins_semi_bold,
    color: '#0f011c',
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  activeTitle: {
    color: colors.white,
  },
  activePill: {
    backgroundColor: '#4c0892',
    flex: 1,
  },
});
