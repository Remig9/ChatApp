import * as React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

import {RH, RW, RF} from '../resize';

export default class Header2 extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <View
          style={{
            width: '80%',

            alignItems: 'center',
            justifyContent: 'center',
            height: RH(10),
          }}>
          <Image
            source={require('../img/logo.png')}
            style={{width: RW(30), height: RH(30), marginTop: RH(3)}}
            resizeMode="contain"
          />
        </View>
        <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
          <Image
            source={require('../img/menu.png')}
            style={{
              height: RH(5),
              width: RW(5),
              marginLeft: RW(3),
              marginTop: RH(2),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
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
    flexDirection: 'row',
  },
});
