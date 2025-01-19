import React from 'react';
import { Image, StyleSheet, StatusBar } from 'react-native';

function SplashComponent() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent={true}
        animated
      />
      <Image
        source={require('../assets/splash_screen.png')}
        style={[styles.container]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flex: 1,
    objectFit: 'cover',
  },
});

export default SplashComponent;
