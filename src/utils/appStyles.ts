import {Platform, StyleSheet} from 'react-native';
import {colors} from './colors';

export const fontFamily = {
  poppins_black: 'PoppinsBlack',
  poppins_bold: 'PoppinsBold',
  poppins_extra_bold: 'PoppinsExtraBold',
  poppins_extra_light: 'PoppinsExtraLight',
  poppins_light: 'PoppinsLight',
  poppins_medium: 'PoppinsMedium',
  poppins_regular: 'PoppinsRegular',
  poppins_semi_bold: 'PoppinsSemiBold',
  poppins_thin: 'PoppinsThin',
};

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.status,
  },
  headerContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    flexGrow: 1,
    marginTop: 10,
  },
  titleTxt: {
    fontSize: 20,
    color: colors.inputBorder,
    fontFamily: fontFamily.poppins_bold,
  },
  boxShadow: {
    shadowColor: colors.arrowShadow,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    ...Platform.select({
      ios: {
        shadowOffset: {width: 0, height: 0},
      },
      android: {
        elevation: 10,
        shadowOffset: {width: 0, height: -10},
      },
    }),
  },
});

export default appStyles;
