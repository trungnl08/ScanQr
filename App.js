// 'use strict';

import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import axios from 'axios';
const {height, width} = Dimensions.get('screen');
const App = () => {
  const onSuccess = e => {
    try {
      axios
        .post(
          'http://139.162.56.4:88/api/check-verify',
          {
            id: e.data,
          },
          {headers: {authorization: 'Bearer ' + token}},
        )
        .then(res => {
          console.log(res.data.message)
          if(res.data.message == 'false'){
            alert('Ticket already used !')
          } else {
            alert('Verify successful!')
          }
          setVisible(false)
        })
        .catch(err => {
          console.log('err',err);
          alert('Something wrong, please contact customer service!')
        });
    } catch (err) {
      console.log(err);
    }
  };
  const [token, setToken] = useState('');
  const [visible, setVisible] = useState(false);
  const [phone, setPhone] = useState('');
  const [pass, setPass] = useState('');
  const login = () => {
    axios
      .post('http://139.162.56.4:88/api/login', {
        phone: phone,
        password: pass,
      })
      .then(res => {
        setToken(res.data.data.token);
        alert('Login success!');
      })
      .catch(err => {
        console.log(err);
      });
  };
  return (
    <View>
      {token.length > 0 ? (
        <View></View>
      ) : (
        <View>
          <View style={{marginTop: 200, marginLeft: 80}}>
            <TextInput
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'grey',
                width: width * 0.6,
              }}
              placeholder={'Phone number'}
              value={phone}
              onChangeText={setPhone}
            />

            <TextInput
              style={{
                borderRadius: 5,
                borderWidth: 1,
                borderColor: 'grey',
                width: width * 0.6,
                marginTop: 20,
              }}
              placeholder={'Password'}
              value={pass}
              onChangeText={setPass}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              login();
            }}>
            <Text
              style={{
                textAlign: 'center',
                borderWidth: 1,
                borderRadius: 5,
                width: width * 0.4,
                alignSelf: 'center',
                marginTop: 30,
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {visible ? (
        <View>
          <QRCodeScanner
            onRead={onSuccess}
            // flashMode={RNCamera.Constants.FlashMode.torch}
            topContent={
              <Text>
                Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer
                and scan the QR code.
              </Text>
            }
          />
          <TouchableOpacity
            style={{
              height: 50,
              width: 140,
              position: 'absolute',
              top: height * 0.7,
              left: width * 0.3,
              borderRadius: 5,
              borderWidth: 0.8,
              borderColor: '#3d7afc',
            }}>
            <Text
              style={{textAlign: 'center', marginTop: 10}}
              onPress={() => {
                setVisible(!visible);
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          {token.length > 0 ? (
            <View>
              <TouchableOpacity
                style={{
                  marginTop: width * 0.4,
                  alignSelf: 'center',
                  borderWidth: 1,
                  padding: 5,
                  width: 200,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setVisible(!visible);
                }}>
                <Text style={{textAlign: 'center'}}>Scan</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 50,
                  alignSelf: 'center',
                  borderWidth: 1,
                  padding: 5,
                  width: 200,
                  borderRadius: 5,
                }}
                onPress={() => {
                  setToken('');
                }}>
                <Text style={{textAlign: 'center'}}>Logout</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View></View>
          )}
        </View>
      )}
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
