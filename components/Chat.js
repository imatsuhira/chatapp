import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // add messages state
      messages: [],
    };
  }

  componentDidMount() {
    // Set name on top of the screen
    // I put it here to avoid warning
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    // after render(), set tate
    this.setState({
      messages: [
        {
          _id: 1,
          text: `Konnichiwa ${name}, this is the first chat message!`,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
          // Mark the message as sent, using one tick
          sent: true,
          // Mark the message as sent, using two tick
          received: true,
          // Mark the message as pending with a clock loader
          pending: true,
          // Any additional custom parameters are passed through
        },
        {
          _id: 2,
          text: 'You have entered a chat',
          createdAt: new Date(),
          system: true,
        },
      ],
    });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
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
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={(messages) => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {/* lift up the message box on android when keyboard appears */}
        {Platform.OS === 'android' ? (
          <KeyboardAvoidingView behavior='height' />
        ) : null}
      </View>
    );
  }
}
