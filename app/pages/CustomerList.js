import React from 'react';
import {StyleSheet, Text, Button, TextInput, View} from 'react-native';

export default function CustomerList() {
  return (
    <View style={styles.flexCenter}>
      <Text>Customer List</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
