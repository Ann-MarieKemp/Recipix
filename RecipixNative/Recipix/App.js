import vision, { firebase } from '@react-native-firebase/ml-vision';
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
      headerStyle: { backgroundColor: '#73BFB8' },
      headerTintColor: 'white',
    },
  },
);
const App = props => {
  return <View></View>;
};
export default createAppContainer(navigator);
