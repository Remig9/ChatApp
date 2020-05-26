import * as React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';

import {RH, RW, RF} from '../resize';

export default class Header1 extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Image
          source={require('../img/logo.png')}
          style={{width: RW(30), height: RH(30), marginTop: RH(3)}}
          resizeMode="contain"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: RH(10),
    width: RW(100),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
