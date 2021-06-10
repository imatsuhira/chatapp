import React from 'react';
import {
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from 'react-native-gifted-chat';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import CustomActions from './CustomActions';
import firebase from 'firebase';
import MapView from 'react-native-maps';
require('firebase/firestore');

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer','Animated.event']); 

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // add messages state
      messages: [],
      isConnected: false,
      image: null,
      //uid: '',
      user: {
        _id: '',
        name: this.props.route.params.name,
        avatar: null
      },
      location: null
    };

    if (!firebase.apps.length)
      firebase.initializeApp({
        apiKey: 'AIzaSyBdW7AeKrTZrqINmJPoZlNX1-5QLDw8Fe8',
        authDomain: 'chatapp-6dacb.firebaseapp.com',
        projectId: 'chatapp-6dacb',
        storageBucket: 'chatapp-6dacb.appspot.com',
        messagingSenderId: '839455823126',
        appId: '1:839455823126:web:3ad2a5ae9f92c939a2ac37',
        measurementId: 'G-FLQE0S6MJN',
      });
  }

  // create getMessages() function
  getMessages = async () => {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
      a;
    }
  };

  componentDidMount() {
    // check if user is online
    NetInfo.fetch().then((connection) => {
      if (connection.isConnected) {
        console.log('online');
        this.setState({
          isConnected: true,
        });
        // reference firebase to get messages
        this.referenceChatMessages = firebase
          .firestore()
          .collection('messages');

        // let user anonymously log in
        this.authUnsubscribe = firebase
          .auth()
          .onAuthStateChanged(async (user) => {
            if (!user) {
              await firebase.auth().signInAnonymously();
            }
            this.setState({
              messages: [],
              user: {
                _id: user.uid
              }
            });
          });
        // Save chat history when it's unmounted
        this.unsubscribeChatUser = this.referenceChatMessages
          .orderBy('createdAt', 'desc')
          .onSnapshot(this.onCollectionUpdate);
      } else {
        console.log('offline');
        //if offline, get messages from localStorage
        this.getMessages();
      }
    });

    // Set name on top of the screen
    // I put it here to avoid warning
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  }

  //hide input bar when offline
  renderInputToolbar(props) {
    if (this.state.isConnected) {
      return <InputToolbar {...props} />;
    }
  }

  componentWillUnmount() {
    if (this.state.isConnected) {
      //stop listening for changes
      this.unsubscribeChatUser;
      // stop listening for authentication
      this.authUnsubscribe;
    }
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      //get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
        image: data.image,
        location: data.location
      });
    });
    this.setState({
      messages,
    });
  };

  onSend(messages = []) {
    this.setState(
      (previousState) => ({
        messages: GiftedChat.append(previousState.messages, messages),
      }),
      () => {
        this.saveMessages();
        this.addMessage();
      }
    );
  }

  saveMessages = async () => {
    try {
      await AsyncStorage.setItem(
        'messages',
        JSON.stringify(this.state.messages)
      );
    } catch (error) {
      console.log(error.message);
    }
  };

  deleteMessages = async () => {
    try {
      await AsyncStorage.removeItem('messages');
      this.setState({
        messages: [],
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  //when onSend is called, this function is called after the message state is updated
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      //uid: this.state.uid,
      createdAt: message.createdAt,
      text: message.text || null,
      user: message.user,
      image: message.image || null,
      location: message.location || null,
    });
  }

  // Change the color of chat bubble
  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#00BFFF', //DeepskyBlue
          },
        }}
      />
    );
  }

  setImage = () => {
    this.setState({
      image: this.props.result
    })
  }

  //Add media button
  renderCustomActions = (props) => {
    return <CustomActions {...props} onCollectionUpdate={this.onCollectionUpdate} />;
  };

  renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: Number(currentMessage.location.latitude),
            longitude: Number(currentMessage.location.longitude),
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  render() {
    let chosenColor = this.props.route.params.chosenColor;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: chosenColor,
          justifyContent: 'center',
        }}>
        <GiftedChat
          isAnimated
          renderBubble={this.renderBubble.bind(this)}
          renderInputToolbar={this.renderInputToolbar.bind(this)}
          renderActions={this.renderCustomActions.bind(this)}
          renderCustomView={this.renderCustomView.bind(this)}
          renderUsernameOnMessage={true}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={this.state.user}
        />
        {/* lift up the message box on android when keyboard appears */}
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    );
  }
}
