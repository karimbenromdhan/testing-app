import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ProductsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.option}>Newest</Text>
      <Text style={styles.option}>Latest</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  option: {
    fontSize: 18,
    marginVertical: 10,
  },
}); 