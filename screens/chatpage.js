import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Header1 from '../components/header1';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {RH, RW, RF} from '../resize';
import {endPoint} from '../components/baseapi';
import AsyncStorage from '@react-native-community/async-storage';

export default class Chatpage extends React.Component {
  static navigationOptions = {
    drawerLabel: 'News',
    drawerIcon: ({tintColor}) => (
      <Image
        source={require('../img/n.png')}
        style={[styles.icon2, {tintColor: tintColor}]}
        resizeMode="contain"
      />
    ),
  };
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      firstname: '',
      api_token: '',
      user: {},
      chatlist: [],
      error: '',
    };
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('token');
      if (value !== null) {
        console.warn('vvvvv', 'token');
        console.warn('value', value);
        this.setState({api_token: value});
      }
    } catch (e) {
      // error reading value
    }
  };

  componentDidMount = async () => {
    const {navigation} = this.props;
    await this.getData();
    this.getall();
    if (this.state.chatlist == '') {
      this.setState({error: 'no chat history yet'});
    }
    this.focusListener = navigation.addListener('didFocus', () =>
      this.getall(),
    );
  };

  getall = () => {
    this.setState({isloading: true});
    axios
      .get(`${endPoint}/users/get_chat_list`, {
        headers: {
          Authorization: `Bearer ${this.state.api_token}`,
          Accept: 'application/json',
        },
      })
      .then(res => {
        this.setState({isloading: false});
        console.warn(res);
        this.setState({chatlist: res.data.chat_list});
        console.warn('ghdhggh', this.state.chatlist);
      })
      .catch(error => {
        console.warn(error);
        this.setState({isloading: false});
        Snackbar.show({
          title: 'Error Loading Data. Please Check internet Connectivity.',
          duration: Snackbar.LENGTH_SHORT,
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header1 />
        <Text
          style={{
            color: 'red',
            alignSelf: 'center',
            marginTop: RH(1),
            fontSize: RF(13),
          }}>
          Chat History
        </Text>
        <ScrollView>
          <Text style={{alignSelf: 'center', marginTop: RH(4)}}>
            {this.state.error}
          </Text>

          {this.state.chatlist.map((item, key) => (
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                width: RW(100),
                height: RH(8),
                alignItems: 'center',
                backgroundColor: '#FFFFFF',
              }}
              key={key}
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  id: item.id,
                })
              }>
              <Image
                source={require('../img/remi.jpeg')}
                style={{
                  height: 50,
                  width: 50,
                  borderRadius: 100 / 2,
                  marginLeft: RW(5),
                }}
              />

              <Text style={{marginLeft: RW(15)}}>{item.sender.full_name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('Friendsonline')}>
          <Image
            source={require('../img/plus.png')}
            style={{
              height: RH(10),
              width: RW(10),
              marginLeft: RW(85),
              marginTop: RH(-10),
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        {this.state.isloading ? (
          <View style={styles.popUp}>
            <ActivityIndicator size="large" color="#00921B" />
          </View>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '90%',
    width: '100%',
  },
  icon: {
    width: RW(15),
    height: RH(15),
  },
  icon2: {
    width: RW(7),
    height: RH(7),
  },
  g: {
    height: RH(23),
    width: '100%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
