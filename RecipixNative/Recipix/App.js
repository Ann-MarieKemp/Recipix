import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AppRegistry, View } from 'react-native';
import CamRoll from './src/screens/CameraRoll';

const navigator = createStackNavigator(
  {
    CamRoll: CamRoll,
  },
  {
    initialRouteName: 'CamRoll',
    defaultNavigationOptions: {
      title: 'Recipix',
      cardStyle: { backgroundColor: '#73BFB8' },
      headerStyle: { backgroundColor: '#ED6A5A' },
      headerTintColor: 'white',
    },
  },
);

export default createAppContainer(navigator);
