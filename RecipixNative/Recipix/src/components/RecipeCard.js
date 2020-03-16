import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const RecipeCard = props => {
  const { recipe, navigation } = props;

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('SingleRecipe', { recipe: recipe });
      }}>
      <View style={styles.recipeCard}>
        <View style={styles.header}>
          <Image style={styles.image} source={recipe.recipePhoto} />
          <View style={styles.nameBox}>
            <Text style={styles.textHeading}>{recipe.recipeName}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  textStyle: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  textHeading: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
  },
  image: {
    width: 100,
    height: 75,
    resizeMode: 'stretch',
    marginTop: 10,
    marginLeft: 9,
  },
  header: {
    flexDirection: 'row',
  },
  nameBox: {
    height: 40,
    borderRadius: 6,
    padding: 6,
    marginLeft: 34,
    alignItems: 'center',
    alignSelf: 'center',
  },
  recipeCard: {
    width: width - 8,
    marginLeft: 4,
    marginRight: 8,
    height: 100,
    backgroundColor: '#ED6A5A',
    borderRadius: 6,
    marginTop: 6,
  },
});
export default RecipeCard;
