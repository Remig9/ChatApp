import React from 'react';
import {
  Text,
  View,
  Image,
  Dimensions,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {RH, RW, RF} from '../resize';
import LinearGradient from 'react-native-linear-gradient';

const {height, width} = Dimensions.get('window');
export default class Splash extends React.Component {
  componentWillMount() {
    setTimeout(() => {
      this.props.navigation.navigate('AppNavigator');
    }, 5000);
  }
  render() {
    return (
      <LinearGradient
        colors={['#272E4F', '#FF5656']}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          source={require('../img/logo.png')}
          style={{
            width: RW(50),
            height: RH(30),
            marginLeft: RW(5),
            marginTop: RH(0.2),
          }}
          resizeMode="contain"
        />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: RF(30),
    fontFamily: 'name',
    color: '#FFFFFF',
    marginTop: '2%',
  },
});
