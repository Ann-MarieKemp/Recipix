import React, { Component } from 'react';
import { FlatList, View, Text } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
const db = firebase.firestore();

class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      user: {},
    };
  }
  async componentDidMount() {
    const recipeResults = await db
      .collection('Recipes')
      .where('user', '==', this.state.user)
      .get();
    console.log(recipeResults, 'results');
    this.setState({ recipes: recipeResults });
  }
  render() {
    if (!this.state.recipes.length) {
      return (
        <View>
          <Text>You have no saved Recipes</Text>
        </View>
      );
    }
    return (
      <View>
        <FlatList
          data={this.state.recipes}
          keyExtractor={item => item.name}
          renderItem={({ item }) => {
            <RecipeCard item={item} />;
          }}
        />
      </View>
    );
  }
}
export default RecipeView;
