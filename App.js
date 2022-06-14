// 'use strict';

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const App = () => {
  const onSuccess = e => {
    try{
      console.log(e)
    } catch(err) {
      console.log(err)
    }
  };
  return (
    <View>
      <Text>ddd</Text>
      <QRCodeScanner
        onRead={onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        topContent={
          <Text>
            Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and
            scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity>
            <Text>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
