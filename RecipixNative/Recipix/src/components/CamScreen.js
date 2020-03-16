import React, { Component } from 'react';
import ImagePicker from 'react-native-image-picker';
import {
  Text,
  TouchableHighlight,
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import vision, { firebase } from '@react-native-firebase/ml-vision';
import TextLine from './TextLine';
import firestore from '@react-native-firebase/firestore';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const db = firebase.firestore();

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback
    onPress={() => {
      Keyboard.dismiss();
    }}>
    {children}
  </TouchableWithoutFeedback>
);
class CamScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photo: '',
      recipe: [],
      gotPhoto: false,
      gotText: false,
      value: '',
      userInfo: this.props.user,
      recipeId: '',
    };
    this.getPhotos = this.getPhotos.bind(this);
    this.getTextStuff = this.getTextStuff.bind(this);
    this.saveRecipe = this.saveRecipe.bind(this);
  }
  getPhotos() {
    ImagePicker.showImagePicker({ noData: true }, response => {
      if (response) {
        let photoUri = { uri: response.uri };
        this.setState({ photo: photoUri, gotPhoto: true });
      }
    });
  }
  async saveRecipe() {
    const recipe = {
      user: this.state.userInfo,
      instructions: this.state.value,
      recipePhoto: this.state.photo,
    };
    await db.collection('Recipes').add({
      recipe,
    });
    this.props.navigation.navigate('SingleRecipe', { recipe: recipe });
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
          value: innerText.join(''),
        });
      } else {
        alert(`You've already analyzed this text!`);
      }
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
      <DismissKeyboard>
        <KeyboardAvoidingView behavior={'padding'}>
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
                <View style={styles.inputContainer}>
                  <Text style={styles.textStyle}>Edit the text below:</Text>
                  <KeyboardAwareScrollView keyboardShouldPersistTaps={'always'}>
                    <TextInput
                      value={this.state.value}
                      onChangeText={text => {
                        this.setState({ value: text });
                      }}
                      multiline={true}
                      style={styles.textInput}
                    />
                  </KeyboardAwareScrollView>
                  <TouchableOpacity
                    onPress={() => {
                      this.saveRecipe();
                    }}
                    style={styles.button}>
                    <Text style={styles.textStyle}>Save</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </KeyboardAvoidingView>
      </DismissKeyboard>
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
    width: width,
    height: 300,
    flex: 1,
    flexWrap: 'wrap',
  },
  inputContainer: {
    width: width - 8,
    height: 375,
  },
});

export default CamScreen;
