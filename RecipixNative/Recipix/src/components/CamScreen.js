import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  Text,
  TouchableHighlight,
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import vision, { firebase } from '@react-native-firebase/ml-vision';
import firestore from '@react-native-firebase/firestore';
import TextLine from './TextLine';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const db = firebase.firestore();
class CamScreen extends Component {
  constructor() {
    super();
    this.state = {
      photo: '',
      recipe: [],
      gotPhoto: false,
      gotText: false,
      value: '',
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
      if (this.state.gotText === false) {
        const response = await firebase
          .vision()
          .cloudTextRecognizerProcessImage(this.state.photo.uri);
        let innerText = [];
        response.blocks.forEach(thing => {
          thing.lines.forEach(thing2 => {
            innerText.push(thing2.text);
          });
        });
        this.setState({
          recipe: innerText,
          gotText: true,
          value: this.state.recipe.join(' '),
        });
        console.log('state', this.state);
      } else {
        console.log('hit this stop');
      }
      const thing = await db.collection('Recipes').get();
      thing.docs.forEach(doc => {
        console.log(doc.data, 'thing');
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    if (!this.state.gotPhoto) {
      return (
        <View style={styles.containerForButton}>
          <View style={styles.descriptionContainer}>
            <Text style={styles.textStyle}>
              Pick a photo from your device or use the camera to take a photo of
              a recipe to transcribe it
            </Text>
          </View>
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.getPhotos()}>
            <Text style={styles.textStyle}>Pick a Photo</Text>
          </TouchableHighlight>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <TouchableHighlight onPress={this.getTextStuff}>
            <Image
              style={styles.image}
              source={{ uri: this.state.photo.uri }}
            />
          </TouchableHighlight>
        </View>
        <View style={styles.rowContainer}>
          {this.state.gotText && (
            <View>
              <Text style={styles.textStyle}>Edit the text below:</Text>
              <FlatList
                keyExtractor={item => item}
                data={this.state.recipe}
                renderItem={({ item }) => <TextLine line={item} />}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: width,
    height: 200,
    resizeMode: 'contain',
  },
  container: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ED6A5A',
    height: 40,
    borderRadius: 6,
    padding: 6,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },

  rowContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageContainer: {
    justifyContent: 'flex-start',
  },
  textStyle: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  containerForButton: {
    width: width,
    height: height,
    alignContent: 'center',
    justifyContent: 'center',
  },
  descriptionContainer: {
    padding: 6,
    marginTop: 10,
  },
  textInput: {
    backgroundColor: '#ED6A5A',
    fontSize: 18,
    color: 'white',
  },
});

export default CamScreen;
