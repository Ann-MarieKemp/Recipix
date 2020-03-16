import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import firebase from '@react-native-firebase/app';
const db = firebase.firestore();
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class SingleRecipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.navigation.getParam('recipe', {}),
    };
  }
  async componentDidMount() {}
  render() {
    return (
      <View style={styles.singleContainer}>
        <Image source={this.state.recipe.recipePhoto} />
        <Text style={styles.textStyle}>{this.state.recipe.instructions}</Text>
      </View>
    );
  }
}
export default SingleRecipe;

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  singleContainer: {
    width: width,
    height: height,
  },
});
