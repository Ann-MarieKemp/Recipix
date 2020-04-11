import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CamRoll from './src/screens/CameraRoll';
import Login from './src/screens/LogIn';
import RecipeView from './src/screens/RecipeView';
import SingleRecipe from './src/screens/SingleRecipe';
import CamScreen from './src/components/CamScreen';

const navigator = createStackNavigator(
  {
    CamRoll: { screen: CamRoll },
    Login: { screen: Login },
    AllRecipes: {
      screen: RecipeView,
    },
    SingleRecipe: { screen: SingleRecipe },
    CamScreen: { screen: CamScreen },
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Recipix',
      cardStyle: { backgroundColor: '#73BFB8' },
      headerStyle: { backgroundColor: '#ED6A5A' },
      headerTintColor: 'white',
      headerBackTitle: 'Back',
    },
  },
);

export default createAppContainer(navigator);
