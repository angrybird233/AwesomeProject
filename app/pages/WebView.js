/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {WebView} from 'react-native-webview';

export default WebView = () => {
  return (
    <WebView
      source={{uri: 'https://dg-web-dev.shouyinongye.com/h6/land-manage'}}
      style={{flex: 1}}
    />
  );
};
