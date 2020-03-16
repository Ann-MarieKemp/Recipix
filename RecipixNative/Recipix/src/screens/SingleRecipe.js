import React, { Component } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
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
    console.log('in singleview', this.state.recipe);
  }
  async componentDidMount() {}
  render() {
    return (
      <View style={styles.singleContainer}>
        <View style={styles.header}>
          <Image style={styles.image} source={this.state.recipe.recipePhoto} />
          <Text style={styles.textStyle}>{this.state.recipe.recipeName}</Text>
        </View>
        <ScrollView style={styles.recipeCard}>
          <Text style={styles.textStyle}>{this.state.recipe.instructions}</Text>
        </ScrollView>
      </View>
    );
  }
}
export default SingleRecipe;

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'stretch',
    marginTop: 10,
    marginLeft: 5,
  },
  singleContainer: {
    width: width,
    height: 400,
  },
  recipeCard: {
    width: width - 10,
    alignSelf: 'center',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 5,
    borderRadius: 6,
    backgroundColor: '#ED6A5A',
  },
  header: {
    flexDirection: 'row',
  },
});
