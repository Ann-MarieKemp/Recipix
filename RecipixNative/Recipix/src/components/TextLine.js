import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';

const TextLine = props => {
  const [value, onChangeText] = useState(props.line);
  return (
    <TextInput
      style={styles.textInput}
      value={value}
      onChangeText={text => {
        onChangeText(text);
      }}
    />
  );
};
export default TextLine;

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 6,
  },
});
