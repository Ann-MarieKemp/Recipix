import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CamScreen from '../components/CamScreen';

class CamRoll extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.navigation.getParam('user', ''),
    };
  }
  render() {
    return (
      <CamScreen navigation={this.props.navigation} user={this.state.user} />
    );
  }
}
export default CamRoll;
