// UpdateCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const levelColors = {
  school: '#3498db',
  grade: '#2ecc71',
  division: '#e67e22',
  person: '#9b59b6',
};

const UpdateCard = ({ title, summary, level }) => {
  return (
    <View style={styles.card}>
      <View style={[styles.badge, { backgroundColor: levelColors[level] }]}>
        <Text style={styles.badgeText}>{level.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summary}>{summary}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 2,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  summary: {
    fontSize: 14,
    color: '#666',
  },
});

export default UpdateCard;
