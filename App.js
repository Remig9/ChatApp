import * as React from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import {createStackNavigator} from 'react-navigation-stack';

import Login from './screens/login';
import Chat from './screens/chat';
import ChatPage from './screens/chatpage';
import Splash from './screens/splash';

const AppNavigator = createStackNavigator(
  {
    Login,
    ChatPage,
    Chat,
  },
  {
    defaultNavigationOptions: {
      headerShown: false,
      activeIntColor: 'red',
    },
  },
);

const MainNavigator = createSwitchNavigator({
  Splash,
  AppNavigator,
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
