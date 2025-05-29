/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {fontFamily} from '../../../utils/appStyles';

interface propsType {
  text: string;
  banner: any;
}

const {width} = Dimensions.get('window');

export const ReadMoreText = (props: propsType) => {
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e: any) => {
    setLengthMore(e.nativeEvent.lines.length > 2);
  }, []);

  return (
    <View style={{marginTop: 5, marginLeft: 2}}>
      <Text
        numberOfLines={textShown ? undefined : 2}
        onTextLayout={onTextLayout}
        selectable
        style={{
          color: '#909090',
          fontSize: 13,
          fontFamily: fontFamily.poppins_semi_bold,
        }}>
        {props?.text}
      </Text>

      {lengthMore ? (
        <TouchableOpacity onPress={toggleNumberOfLines}>
          <Text style={styles.readMoreTxt}>
            {textShown ? 'Read Less...' : 'Read More...'}
          </Text>
        </TouchableOpacity>
      ) : null}
      <View
        style={{
          borderRadius: 100,
          backgroundColor: '#eeecef',
          padding: 5,
          width: 95,
          height: 95,
          marginLeft: 15,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          bottom: -76,
          left: width / 3.5,
        }}>
        <Image source={{uri: props.banner}} style={styles.itemLogo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  readMoreTxt: {
    lineHeight: 21,
    marginTop: 2,
    color: '#5b159d',
    fontSize: 13,
    fontFamily: fontFamily.poppins_bold,
    textDecorationLine: 'underline',
  },
  itemLogo: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
});
