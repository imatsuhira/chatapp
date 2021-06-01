import React from 'react';
import { View, Platform, KeyboardAvoidingView, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import firebase from 'firebase';
require('firebase/firestore');

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // add messages state
      messages: [],
      isAuthorized: false,
      uid: '',
      user: {
        _id: '',
        avatar: null,
        name: this.props.route.params.name,
      },
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

  componentDidMount() {
    // Set name on top of the screen
    // I put it here to avoid warning
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    // reference firebase to get messages
    this.referenceChatMessages = firebase.firestore().collection('messages');
    // //after render(), set state
    // this.setState({
    //   messages: [
    //     {
    //       _id: 1,
    //       text: `Konnichiwa ${name}, this is the first chat message!`,
    //       createdAt: new Date(),
    //       user: {
    //         uid: 2,
    //         name: 'React Native',
    //         avatar: 'https://placeimg.com/140/140/any',
    //       },
    //       // Mark the message as sent, using one tick
    //       sent: true,
    //       // Mark the message as sent, using two tick
    //       received: true,
    //       // Mark the message as pending with a clock loader
    //       pending: true,
    //       // Any additional custom parameters are passed through
    //     },
    //     {
    //       _id: 2,
    //       text: 'You have entered a chat',
    //       createdAt: new Date(),
    //       system: true,
    //     },
    //   ],
    // });

    // let user anonymously log in
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (!user) {
        await firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
        messages: [],
        isAuthorized: true,
      });
    });

    this.unsubscribeChatUser = this.referenceChatMessages
      .orderBy('createdAt', 'desc')
      .onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    //stop listening for changes
    this.unsubscribeChatUser;
    // stop listening for authentication
    this.authUnsubscribe();
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
      () => this.addMessage()
    );
  }

  //when onSend is called, this function is called after the message state is updated
  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      _id: message._id,
      uid: this.state.uid,
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

  render() {
    let chosenColor = this.props.route.params.chosenColor;
    return (
      <View style={{ flex: 1, backgroundColor: chosenColor }}>
        {this.state.isAuthorized ? (
          <View style={{ flex: 1, backgroundColor: chosenColor }}>
            <GiftedChat
              renderBubble={this.renderBubble.bind(this)}
              messages={this.state.messages}
              onSend={(messages) => this.onSend(messages)}
              user={this.state.user}
            />
            {/* lift up the message box on android when keyboard appears */}
            {Platform.OS === 'android' ? (
              <KeyboardAvoidingView behavior='height' />
            ) : null}
          </View>
        ) : (
          <Text>Authorizing... just a moment please</Text>
        )}
      </View>
    );
  }
}
