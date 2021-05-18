import React from 'react';
import { View, Text, StyleSheet, ImageBackground, Button } from 'react-native';

import { Icon, Input } from 'react-native-elements';

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
            <View style={styles.textContainer}>
              {/* <View
                style={{
                  justifyContent: 'center',
                  marginTop: 20,
                }}>
                <Icon
                  name='user'
                  type='antdesign'
                  color='#757083'
                  size={25}
                  style={{ opacity: 0.3 }}
                />
              </View> */}
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
                <View style={styles.circleAlmostBlack}></View>
                <View style={styles.circleGrayPurple}></View>
                <View style={styles.circleGray}></View>
                <View style={styles.circleOliveGreen}></View>
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

  textContainer: {
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  input: {
    color: '#757083',
    opacity: 50,
    backgroundColor: '#FFF',
    // borderColor: '#474056',
    // borderWidth: 1,
    height: 60,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 25,
    borderRadius: 3,
    fontSize: 16,
    fontWeight: '300',
  },

  colorContainer: {
    marginLeft: 25,
    marginTop: 20,
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
    marginBottom: 70,
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
    backgroundColor: '#757083',
    width: '88%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 100,
  },
});
