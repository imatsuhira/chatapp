import React from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';

export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../img/Background_Image.png')}
          style={styles.image}
          blurRadius={3}>
          <Text style={styles.mainTitle}>Hello, World!</Text>
          <View style={styles.startContainer}>
            <View>
              <Image source={require('../img/icon.svg')} />
              <TextInput
                style={(styles.baseFontDeco, styles.input)}
                placeholder='Your Name'
                type='text'
                value={this.state.name}
                onChangeText={(name) => this.setState({ name })}></TextInput>
            </View>

            <View>
              <View style={styles.colorContainer}>
                <Text style={(styles.baseFontDeco, { color: '#757083' })}>
                  Choose a Background Color
                </Text>

                <View
                  style={
                    (styles.circle, { backgroundColor: '#090C08' })
                  }></View>
                <View
                  style={
                    (styles.circle, { backgroundColor: '#474056' })
                  }></View>
                <View
                  style={
                    (styles.circle, { backgroundColor: '#8A95A5' })
                  }></View>
                <View
                  style={
                    (styles.circle, { backgroundColor: '#B0C6AE' })
                  }></View>
              </View>
            </View>
            <Button
              color='#757083'
              title='Start Chatting'
              onPress={() =>
                this.props.navigation.navigate('Chat', {
                  name: this.state.name,
                })
              }
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  baseFontDeco: {
    fontSize: 16,
    fontWeight: '300',
  },

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },

  mainTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
    marginTop: 80,
    marginBottom: 140,
  },

  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },

  startContainer: {
    backgroundColor: '#FFF',
    height: '44%',
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 120,
  },

  input: {
    color: '#757083',
    opacity: 50,
    backgroundColor: '#FFF',
    borderColor: '#474056',
    borderWidth: 1,
    width: '88%',
    height: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 20,
    borderRadius: 3,
  },

  colorContainer: {
    flexDirection: 'column',
  },

  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  startBtn: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    backgroundColor: 'black',
    width: '88%',
  },
});
