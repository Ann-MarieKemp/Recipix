import React, { Component } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  PanResponder,
  Animated,
} from 'react-native';

const TextLine = props => {
  return <Text style={styles.textInput}>{props.line}</Text>;
};
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
