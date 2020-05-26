import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';

import {RH, RW, RF} from '../resize';

export default class Button extends React.Component {
  render() {
    return (
      <View style={styles.box}>
        <Text style={styles.t1}> {this.props.tx} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    height: RH(6),
    width: RW(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5656',
    borderRadius: 50,
    marginLeft: RW(20),
  },
  t1: {
    color: 'white',
    fontSize: RF(11),
  },
});
