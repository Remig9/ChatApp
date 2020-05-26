import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  PermissionsAndroid,
  androidHeaderHeight,
  Clipboard,
} from 'react-native';
import {Header, NavigationActions} from 'react-navigation';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import RNFS from 'react-native-fs';
import Sound from 'react-native-sound';
import {ChatScreen} from 'react-native-easy-chat-ui';
import ImagePicker from 'react-native-image-crop-picker';
import {RH, RW, RF} from '../resize';

export default class Chat extends React.Component {
  state = {
    library: false,
    Take: false,
    pick: false,
    myId: '88886666',
    messages: [
      {
        id: `1`,
        type: 'text',
        content: 'hello world',
        targetId: '12345678',

        chatInfo: {
          avatar: require('../img/pas2.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 0,
        time: '1542006036549',
        userName: 'Remi',
      },
      {
        id: `11`,
        type: 'text',
        content: 'Any one there',
        targetId: '12345678',
        chatInfo: {
          avatar: require('../img/pas2.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 0,
        time: '1542006036549',
      },
      {
        id: `14`,
        type: 'text',
        content: 'helloooo',
        targetId: '12345678',
        chatInfo: {
          avatar: require('../img/pas2.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 0,
        time: '1542006036549',
      },
      {
        id: `2`,
        type: 'text',
        content: 'hi/{se}',
        targetId: '88886666',
        chatInfo: {
          avatar: require('../img/pas1.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542106036549',
      },
      {
        id: `3`,
        type: 'image',
        content: {
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSokBPnORk1sXfgnWKH9O7TntlQhSvpu_vbrLdepOMHdD7_F6nD&usqp=CAU',
          width: RW(70),
          height: RH(50),
        },
        targetId: '88886666',
        chatInfo: {
          avatar: require('../img/remi.jpeg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: false,
        sendStatus: 1,
        time: '1542106037000',
      },

      {
        id: `4`,
        type: 'text',
        content: 'great',
        targetId: '12345678',
        chatInfo: {
          avatar: require('../img/remi.jpeg'),
          id: '12345678',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542177036549',
      },
      {
        id: `5`,
        type: 'voice',
        content: {
          uri: 'https://open.spotify.com/album/0GxxbvuvH78qHtiAWz7P4R',
          length: 10,
        },
        targetId: '88886666',
        chatInfo: {
          avatar: require('../img/bc.jpg'),
          id: '12345678',
          nickName: 'Test',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542260667161',
      },
      {
        id: `6`,
        type: 'voice',
        content: {
          uri: 'https://open.spotify.com/album/0GxxbvuvH78qHtiAWz7P4R',
          length: 30,
        },
        targetId: '88886666',
        chatInfo: {
          avatar: require('../img/bb.jpg'),
          id: '12345678',
        },
        renderTime: true,
        sendStatus: 1,
        time: '1542264667161',
      },
    ],
    // chatBg: require('../../source/bg.jpg'),
    inverted: true, // require
    voiceHandle: true,
    currentTime: 0,
    recording: true,
    paused: false,
    stoppedRecording: false,
    finished: true,
    audioPath: '',
    voicePlaying: false,
    voiceLoading: false,
  };

  sendMessage = (type, content, isInverted) => {
    console.warn(type, content, isInverted, 'msg');
    ans = {
      id: `1`,
      type: type,
      content: content,
      targetId: '12345678',
      chatInfo: {
        avatar: require('../img/pas2.jpeg'),
        id: '12345678',
        nickName: 'Test',
      },
      renderTime: true,
      sendStatus: 0,
      time: '1542006036549',
    };
  };

  lib = async () => {
    await this.setState({library: true});
    await this.setState({Take: false});
    this.setState({pick: false});
    await this.try();
    console.warn('library is now true');
  };

  tak = async () => {
    await this.setState({Take: true});
    await this.setState({library: false});
    this.setState({pick: false});
    await this.try();
    console.warn('Take is now true');
  };

  try() {
    if (this.state.library === true && this.state.Take === false) {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        compressImageQuality: 0.1,
      })
        .then((image) => {
          this.setState({pick: false});
          this.setState({library: false});
          this.setState({Take: false});
          console.warn(image);
          this.setState({value2: 'Photo selected'});
          this.setState({photo: image});
        })
        .catch((e) => {
          this.setState({Take: false});
          this.setState({library: false});
          console.warn('cancel');
          console.warn(e);
        });
    } else if (this.state.Take === true && this.state.library === false) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        freeStyleCropEnabled: true,
        compressImageQuality: 0.1,
      })

        .then((image) => {
          this.setState({pick: false});
          this.setState({Take: false});
          this.setState({library: false});
          console.warn(image);
          this.setState({value2: 'Photo Taken'});
          this.setState({photo: image});
        })
        .catch((e) => {
          this.setState({Take: false});
          this.setState({library: false});
          console.warn(e);
        });
    }
  }
  press(type, index, text) {
    {
      let items = [
        {
          title: 'del',
          onPress: () => {
            that.props.delMessage([index]);
          },
        },

        {
          title: 'Multiple ',
          onPress: () => {
            that.multipleSelect(index);
          },
        },
      ];

      if (type === 'text') {
        items = [
          {title: 'Copy', onPress: () => Clipboard.setString(text)},
          {
            title: 'Delete',
            onPress: () => {
              that.props.delMessage([index]);
            },
          },
          {
            title: 'Multi Select',
            onPress: () => {
              that.multipleSelect(index);
            },
          },
        ];
      }
      return items;
    }
  }

  render() {
    return (
      <ChatScreen
        ref={(e) => (this.chat = e)}
        audioHasPermission={true}
        userProfile={{id: this.state.myId, avatar: require('../img/pas1.jpeg')}}
        pressInText="press in"
        pressOutText="press out"
        placeholder="Type your message"
        voiceErrorText="voice error"
        voiceCancelText="voice cancel"
        voiceNoteText="voiceNoteText"
        showUserName={true}
        setPopItems={(type, index, text) => this.press(type, index, text)}
        chatBackgroundImage={require('../img/bb.jpg')}
        messageList={this.state.messages}
        androidHeaderHeight={androidHeaderHeight}
        sendMessage={this.sendMessage}
      />
    );
  }
}
