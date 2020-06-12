import React from 'react';
import { StyleSheet, StatusBar, View } from 'react-native';

import Routes from './src/routes';

export default function App() {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent></StatusBar>
      <Routes/>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
