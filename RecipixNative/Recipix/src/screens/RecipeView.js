import React, { Component } from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import RecipeCard from '../components/RecipeCard';
import firestore from '@react-native-firebase/firestore';
import vision, { firebase } from '@react-native-firebase/ml-vision';

class RecipeView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: [],
      user: {},
    };
  }
  async componentDidMount() {
    const snapshot = await firebase
      .firestore()
      .collection('Recipes')
      .get();
    const info = snapshot.docs.map(doc => {
      return doc.data();
    });
    this.setState({ recipes: info });
  }

  render() {
    if (!this.state.recipes.length) {
      return (
        <View>
          <Text style={styles.textStyle}>You have no saved Recipes</Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.textStyle}>All Recipes</Text>
        {console.log(this.state.recipes, 'beforeflat')}
        <FlatList
          data={this.state.recipes}
          keyExtractor={item => item.recipe.recipeName}
          renderItem={({ item }) => {
            return (
              <RecipeCard
                recipe={item.recipe}
                navigation={this.props.navigation}
              />
            );
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 22,
    textAlign: 'center',
  },
});
export default RecipeView;
