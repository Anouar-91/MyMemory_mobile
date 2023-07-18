import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UnderlinedTitle = ({ text, color, size }) => {
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color, fontSize: size }]}>
        {text}
      </Text>
      <View style={[styles.underline, { backgroundColor: color, width: '90%' }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  underline: {
    height: 2,
  },
});

export default UnderlinedTitle;