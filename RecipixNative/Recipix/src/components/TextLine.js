import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  PanResponder,
  Animated,
} from 'react-native';

class TextLine extends Component {
  constructor(props) {
    super(props);
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy });
      },
      onPanResponderRelease: () => {},
    });
    const position = new Animated.ValueXY();
    this.state = {
      value: this.props.line,
      panResponder,
      position,
    };
    this.onChangeText = this.onChangeText.bind(this);
  }
  onChangeText(text) {
    this.setState({ value: text });
  }

  render() {
    return (
      <Animated.View
        {...this.state.panResponder.panHandlers}
        style={this.state.position.getLayout()}>
        <Text style={styles.textInput}>{this.state.value}</Text>
      </Animated.View>
    );
  }
}
export default TextLine;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#ED6A5A',
    borderRadius: 8,
    color: 'white',
    fontSize: 18,
    margin: 2,
    padding: 4,
    flexShrink: 0,
  },
});
