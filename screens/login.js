import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {RH, RW, RF} from '../resize';
import Button from '../components/button';
import axios from 'axios';
import Snackbar from 'react-native-snackbar';
import {ScrollView} from 'react-native-gesture-handler';
import {endPoint} from '../components/baseapi';
import Header1 from '../components/header1';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      err: '',
      isloading: false,
      firstname: '',
      api_token: '',
      user: {},
    };
  }
  storeData = async (res) => {
    try {
      await AsyncStorage.setItem('username', res);
      console.warn('>>>>', 'saved');
    } catch (e) {
      // saving error
    }
  };
  storeData2 = async (res) => {
    try {
      await AsyncStorage.setItem('token', res);
      console.warn('>>>>', 'saved2');
    } catch (e) {
      // saving error
    }
  };

  submit = async () => {
    const {email, password, isloading} = this.state;

    if (email == '' || password == '') {
      alert('all fields are required');
    } else {
      this.setState({isloading: true});
      axios
        .post(`${endPoint}/users/login`, {
          email: email,
          password: password,
        })
        .then((res) => {
          this.setState({isloading: false});
          console.warn(res.data.response);
          this.setState({user: res.data});
          this.setState({err: res.data.response.message});
          if (res.data.response.code == 200) {
            this.storeData(res.data.response.user.full_name);
            this.storeData2(res.data.response.user.api_token);
            this.props.navigation.navigate('Map');
          } else if (res.data.response.code == 401) {
            alert(res.data.response.message);
          }
        })
        .catch((error) => {
          console.warn(error);

          this.setState({isloading: false});
          Snackbar.show({
            title: 'Error Loading Data. Please Check internet Connectivity.',
            duration: Snackbar.LENGTH_SHORT,
          });
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Header1 />

        <View style={styles.box1}>
          <ScrollView>
            <Text style={styles.h1}> Login</Text>

            <Text style={{color: 'red', marginTop: '5%', alignSelf: 'center'}}>
              {this.state.err}
            </Text>
            <Text
              style={{
                color: '#737A91',
                marginTop: RH(4),
                marginLeft: RW(5),
              }}>
              Email address
            </Text>

            <Image
              source={require('../img/user.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <TextInput
              returnKeyType={'next'}
              onSubmitEditing={() => {
                this.Password.focus();
              }}
              blurOnSubmit={false}
              style={styles.textinput}
              onChangeText={(email) => this.setState({email})}
              placeholder="Email address"
            />

            <Text
              style={{
                color: '#737A91',
                marginTop: RH(10),
                marginLeft: RW(5),
              }}>
              Password
            </Text>

            <Image
              source={require('../img/password.png')}
              style={styles.icon}
              resizeMode="contain"
            />

            <TextInput
              ref={(input) => {
                this.Password = input;
              }}
              secureTextEntry={true}
              style={styles.textinput}
              onChangeText={(password) => this.setState({password})}
              placeholder="Password"
            />

            <View style={{marginTop: RH(10)}}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Chat')}>
                <Button tx="Login" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Forgotpword')}>
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: RH(7),
                    color: '#737A91',
                  }}>
                  Forgot Password?
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: RH(2),
                }}>
                <Text style={{color: '#737A91'}}> No account yet? </Text>
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate('Reg')}>
                  <Text style={{color: '#ECC90D'}}> Sign Up </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>

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

    backgroundColor: '#272E4F',
  },
  box1: {
    height: '90%',
    width: '100%',
    backgroundColor: '#272E4F',
  },

  h1: {
    fontSize: RF(20),
    marginTop: '10%',
    fontWeight: 'bold',
    marginBottom: RH(3),
    color: '#C3C8DF',
    marginLeft: RW(5),
  },
  h3: {
    fontSize: RF(10),
    alignSelf: 'center',
    color: '#737A91',
  },
  popUp: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: RF(25),
    fontFamily: 'name',
    color: '#00921B',
    marginTop: '2%',
  },
  icon: {
    width: RW(4),
    height: RH(4),
    marginLeft: RW(5),
    marginBottom: RH(-5),
  },
  textinput: {
    borderBottomWidth: 1,
    marginLeft: RW(5),
    width: RW(90),
    height: RH(6),
    borderRadius: 5,
    borderColor: '#ECC90D',
    paddingLeft: 25,
  },
});
