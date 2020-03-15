import React, { Component } from 'react';
import { View, TextInput, StyleSheet, PanResponder } from 'react-native';

class TextLine extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.line,
    };
    this.onChangeText = this.onChangeText.bind(this);
  }
  onChangeText(text) {
    this.setState({ value: text });
  }

  render() {
    return (
      <TextInput
        style={styles.textInput}
        value={this.state.value}
        onChangeText={text => {
          this.onChangeText(text);
        }}
      />
    );
  }
}
export default TextLine;

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: '#ED6A5A',
    borderRadius: 8,
    color: 'white',
    fontSize: 22,
    margin: 2,
    padding: 4,
  },
});
