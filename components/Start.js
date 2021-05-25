import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { Input } from 'react-native-elements';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      chosenColor: '',
    };
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ImageBackground
          source={require('../assets/Background_Image.png')}
          style={styles.image}
          blurRadius={3}>
          <Text style={styles.mainTitle}>Hello, World!</Text>
          <View style={styles.startContainer}>
            <View style={styles.textContainer}>
              <Input
                leftIcon={{
                  type: 'antdesign',
                  name: 'user',
                  opacity: 0.2,
                  marginTop: 20,
                }}
                containerStyle='none'
                style={styles.input}
                placeholder='Your Name'
                type='text'
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}
              />
            </View>

            <View style={styles.colorContainer}>
              <Text style={styles.chooseColor}>Choose a Background Color</Text>
              <View style={styles.colorChoice}>
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='Chat background color'
                  accessibilityHint='You can choose chat background color to black'
                  onPress={() => this.setState({ chosenColor: '#090c08' })}>
                  <View style={styles.circleAlmostBlack}></View>
                </TouchableOpacity>

                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='Chat background color'
                  accessibilityHint='You can choose chat background color to dark purple'
                  onPress={() => this.setState({ chosenColor: '#474056' })}>
                  <View style={styles.circleGrayPurple}></View>
                </TouchableOpacity>

                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='Chat background color'
                  accessibilityHint='You can choose chat background color to gray purple'
                  onPress={() => this.setState({ chosenColor: '#8A95A5' })}>
                  <View style={styles.circleGray}></View>
                </TouchableOpacity>

                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel='Chat background color'
                  accessibilityHint='You can choose chat background color to olive green'
                  onPress={() => this.setState({ chosenColor: '#B9C6AE' })}>
                  <View style={styles.circleOliveGreen}></View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.startBtn}>
              <Button
                color='#757083'
                title='Start Chatting'
                onPress={() =>
                  this.props.navigation.navigate('Chat', {
                    name: this.state.name,
                    chosenColor: this.state.chosenColor,
                  })
                }
              />
            </View>
          </View>
          <View style={{ flex: 0.5 }}></View>
        </ImageBackground>
      </KeyboardAvoidingView>
    );
  }
}

/* Design */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  mainTitle: {
    flex: 2,
    fontSize: 45,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 60,
    // marginBottom: 100,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  startContainer: {
    flex: 5,
    backgroundColor: '#FFF',
    height: '44%',
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 30,
  },

  textContainer: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  input: {
    color: '#757083',
    opacity: 50,
    backgroundColor: '#FFF',
    height: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
    borderRadius: 3,
    fontSize: 16,
    fontWeight: '300',
    flex: 3,
  },

  colorContainer: {
    marginLeft: 25,
    marginTop: 20,
    flex: 1,
  },

  chooseColor: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
  },

  colorChoice: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 15,
    //marginBottom: 70,
  },

  circleAlmostBlack: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#090c08',
    marginRight: 20,
  },

  circleGrayPurple: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#474056',
    marginRight: 20,
  },

  circleGray: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#8A95A5',
    marginRight: 20,
  },

  circleOliveGreen: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#B9C6AE',
    marginRight: 20,
  },

  startBtn: {
    fontSize: 16,
    height: 50,
    fontWeight: '600',
    color: '#FFF',
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    flex: 0.5,
  },
});
