import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import firebase from 'firebase';
require('firebase/firestore');

import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer', 'Animated.event']);

export default class CustomActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
    };
  }

  pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status === 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      }).catch((err) => console.log(err));

      if (!result.cancelled) {
        const imageUrl = await this.uploadImageFetch(result.uri);
        this.props.onSend({ image: imageUrl })
      }
    }
  };

  takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    try {
      if (status === 'granted') {
        let result = await ImagePicker.launchCameraAsync({
          mediaTypes: 'Images',
        }).catch((err) => console.log(err));

        if (!result.cancelled) {
          const imageUrl = await this.uploadImageFetch(result.uri);
          this.props.onSend({ image: imageUrl })
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.High}).catch((err) =>
        console.log(err)
      );

      if (result) {
        this.props.onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude
          }
        })
      }
    }
  };

  showActionSheet = () => {
    this.ActionSheet.show();
  };

  onActionPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log('user wants to pick an image');
            return this.pickImage();
          case 1:
            console.log('user wants to take a photo');
            return this.takePhoto();
          case 2:
            console.log('user wants to get their location');
            return this.getLocation();
        }
      }
    );
  };

  uploadImageFetch = async (uri) => {
    const blob = await new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        res(xhr.response);
      };
      xhr.onerror = function (e) {
        console.log(e);
        rej(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    const imageNameBefore = uri.split("/");
    const imageName = imageNameBefore[imageNameBefore.length - 1];

    const ref = firebase.storage().ref().child(`images/${imageName}`);

    const snapshot = await ref.put(blob);

    blob.close()

    return await snapshot.ref.getDownloadURL();
  }

  render() {
    return (
      <TouchableOpacity
        accessible={true}
        accessibilityLabel='More options'
        accessibilityHint='You can choose to send a image or your geolocation'
        style={[styles.container]}
        onPress={this.onActionPress}>
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
          <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};
