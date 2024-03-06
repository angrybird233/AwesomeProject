import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function LandDetail() {
  return (
    <View style={styles.flexCenter}>
      <Text>Land Detail</Text>
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
