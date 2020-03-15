import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CamRoll from './src/screens/CameraRoll';
import Login from './src/screens/Login';
import RecipeView from './src/screens/RecipeView'

const navigator = createStackNavigator(
  {
    CamRoll: CamRoll,
    Login: Login,
    AllRecipes: RecipeView
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
