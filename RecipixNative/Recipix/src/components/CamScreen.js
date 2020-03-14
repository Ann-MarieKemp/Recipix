import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  Text,
  TouchableHighlight,
  View,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import vision, { firebase } from '@react-native-firebase/ml-vision';
import TextLine from './TextLine';

class CamScreen extends Component {
  constructor() {
    super();
    this.state = {
      photo: '',
      recipe: [],
      gotPhoto: false,
      gotText: false,
    };
    this.getPhotos = this.getPhotos.bind(this);
    this.getTextStuff = this.getTextStuff.bind(this);
  }
  getPhotos() {
    ImagePicker.showImagePicker({ noData: true }, response => {
      if (response) {
        let photoUri = { uri: response.uri };
        this.setState({ photo: photoUri, gotPhoto: true });
      }
    });
  }
  async getTextStuff() {
    try {
      if (!this.state.gotPhoto) {
        const response = await firebase
          .vision()
          .cloudTextRecognizerProcessImage(this.state.photo.uri);
        let innerText = [];
        response.blocks.forEach(thing => {
          thing.lines.forEach(thing2 => {
            innerText.push(thing2.text);
          });
        });
        this.setState({ recipe: innerText, gotText: true });
      }
    } catch (error) {
      console.error(error);
    }
    //
  }

  render() {
    if (!this.state.gotPhoto) {
      return (
        <View style={styles.buttonContainer}>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.getPhotos()}>
            <Text>Go To Camera Roll</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableHighlight
            style={styles.touchableHighlightContainer}
            onPress={this.getTextStuff}>
            <Image
              style={styles.image}
              source={{ uri: this.state.photo.uri }}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.rowContainer}>
          {this.state.recipe && (
            <FlatList
              data={this.state.recipe}
              keyExtractor={line => line}
              renderItem={({ item }) => {
                return <TextLine line={item} />;
              }}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ED6A5A',
    height: 30,
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
  },
  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    justifyContent: 'flex-start',
    borderWidth: 2,
    borderColor: 'black',
  },
  touchableHighlightContainer: {
    width: 400,
    height: 200,
  },
});

export default CamScreen;
