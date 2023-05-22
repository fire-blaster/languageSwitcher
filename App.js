import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SwiperComponent from './src/component/Swiper';
import {I18nextProvider} from 'react-i18next';
import i18n from './src/languages/i18n';
const App = () => {
  return (
    <I18nextProvider i18n={i18n}>
      <SwiperComponent />
    </I18nextProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
