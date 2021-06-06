import PropTypes from 'prop-types';
import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import ActionSheet from 'react-native-actionsheet';
import MapView from 'react-native-maps';
import { Audio } from 'expo-av';
import { Camera } from 'expo-camera';

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
        this.setState({
          image: result,
        });
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
          this.setState({
            image: result,
          });
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      let result = await Location.getCurrentPositionAsync({}).catch((err) =>
        console.log(err)
      );
      const longitude = JSON.stringify(result.coords.longitude);
      const altitude = JSON.stringify(result.coords.latitude);

      if (result) {
        props.onSend({
          location: {
            longitude: result.coords.longitude,
            latitude: result.coords.latitude,
          },
        });
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
          {/* <ActionSheet
            title={'Choose which media to send'}
            options={[
              'Choose from Library',
              'Take Picture',
              'Send Location',
              'Cancel',
            ]}
            cancelButtonIndex={options.length - 1}
            onPress={async (buttonIndex) => {
              switch (buttonIndex) {
                case 0:
                  console.log('user wants to pick an image');
                  return pickImage();
                case 1:
                  console.log('user wants to take a photo');
                  return takePhoto();
                case 2:
                  console.log('user wants to get their location');
                  return getLocation();
              }
            }}
          /> */}
        </View>
      </TouchableOpacity>
    );
  }
  // return (
  //   <TouchableOpacity
  //     accessible={true}
  //     accessibilityLabel='More options'
  //     accessibilityHint='You can choose to send a image or your geolocation'
  //     style={[styles.container]}
  //     onPress={showActionSheet}>
  //     <View style={[styles.wrapper, props.wrapperStyle]}>
  //       <Text style={[styles.iconText, props.iconTextStyle]}>+</Text>
  //       <ActionSheet
  //         title={'Choose which media to send'}
  //         options={[
  //           'Choose from Library',
  //           'Take Picture',
  //           'Send Location',
  //           'Cancel',
  //         ]}
  //         cancelButtonIndex={options.length - 1}
  //         onPress={async (buttonIndex) => {
  //           switch (buttonIndex) {
  //             case 0:
  //               console.log('user wants to pick an image');
  //               return pickImage();
  //             case 1:
  //               console.log('user wants to take a photo');
  //               return takePhoto();
  //             case 2:
  //               console.log('user wants to get their location');
  //               return getLocation();
  //           }
  //         }}
  //       />
  //     </View>
  //   </TouchableOpacity>
  // );
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