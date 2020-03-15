import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import CamRoll from './src/screens/CameraRoll';
import Login from './src/screens/Login';

const navigator = createStackNavigator(
  {
    CamRoll: CamRoll,
    Login: Login,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      title: 'Recipix',
      cardStyle: { backgroundColor: '#73BFB8' },
      headerStyle: { backgroundColor: '#ED6A5A' },
      headerTintColor: 'white',
    },
  },
);

export default createAppContainer(navigator);
