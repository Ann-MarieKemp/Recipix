import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
} from 'react-native';
import { GOOGLE_CLIENT_ID } from '../../secrets';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      userInfo: {},
      loggedIn: false,
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
    this.getCurrentUserInfo = this.getCurrentUserInfo.bind(this);
    this.goToRecipes = this.goToRecipes.bind(this);
  }
  componentDidMount() {
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
    });
    this.getCurrentUserInfo();
    if (this.state.userInfo.user) {
      this.props.navigation.navigate('CamRoll');
    }
  }
  async getCurrentUserInfo() {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        this.setState({ loggedIn: false });
      } else {
        this.setState({ loggedIn: false });
      }
    }
  }
  async signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      this.setState({ userInfo: userInfo, loggedIn: true });
      this.props.navigation.navigate('CamRoll');
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('sign in cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('sign in in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('issue with play services');
      } else {
        console.log('there was an error');
      }
    }
  }
  async signOut() {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ userInfo: {}, loggedIn: false });
    } catch (error) {
      console.error(error);
    }
  }
  goToRecipes() {
    this.props.navigation.navigate('CamRoll');
  }
  render() {
    if (!this.state.userInfo.user) {
      return (
        <View style={styles.loginContainer}>
          <Text style={styles.textStyle}>Please Login</Text>
          <GoogleSigninButton
            style={{ width: 192, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this.signIn}
            disabled={this.state.isSigninInProgress}
          />
        </View>
      );
    } else {
      return (
        <View style={styles.loginContainer}>
          <Text style={styles.textStyle}>
            Welcome {this.state.userInfo.user.name}!
          </Text>
          <TouchableHighlight
            style={styles.buttonBackground}
            onPress={this.goToRecipes}>
            <Text style={styles.textStyle}>Go to Recipes</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.buttonBackground}
            onPress={this.signOut}>
            <Text style={styles.textStyle}>Logout</Text>
          </TouchableHighlight>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: height - 300,
    width: width,
  },
  textStyle: {
    color: 'white',
    fontSize: 22,
  },
  buttonBackground: {
    backgroundColor: '#ED6A5A',
    borderRadius: 6,
    height: 40,
    justifyContent: 'center',
    padding: 4,
    marginTop: 8,
  },
});

export default Login;
