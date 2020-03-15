import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CamScreen from '../components/CamScreen';
import { useNavigation } from 'react';

class CamRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user', ''),
    };
  }
  render() {
    return <CamScreen user={this.state.user} />;
  }
}
export default CamRoll;
