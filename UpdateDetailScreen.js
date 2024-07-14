import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const UpdateDetailScreen = ({ route }) => {
  const { update } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{update.title}</Text>
      <Text style={styles.content}>{update.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    color: '#555',
  },
});

export default UpdateDetailScreen;
