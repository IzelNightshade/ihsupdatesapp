// HomeScreen.js
import React, { useState } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import UpdateCard from './UpdateCard'; // Make sure to create and import this component

const HomeScreen = ({ user, handleLogout }) => {
  const [updates, setUpdates] = useState([
    { id: '1', title: 'School Event', summary: 'Join us for a school-wide event...', level: 'school' },
    { id: '2', title: 'Grade 10 Exam Schedule', summary: 'The exam schedule for Grade 10...', level: 'grade' },
    { id: '3', title: 'Division A Meeting', summary: 'Division A will have a meeting...', level: 'division' },
    { id: '4', title: 'Personal Reminder', summary: 'Don’t forget to submit your assignment...', level: 'person' },
  ]);
  const [filter, setFilter] = useState('all');

  const filteredUpdates = updates.filter(update => filter === 'all' || update.level === filter);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterContainer}>
        <Button title="All" onPress={() => setFilter('all')} />
        <Button title="School" onPress={() => setFilter('school')} />
        <Button title="Grade" onPress={() => setFilter('grade')} />
        <Button title="Division" onPress={() => setFilter('division')} />
        <Button title="Personal" onPress={() => setFilter('person')} />
      </View>
      <FlatList
        data={filteredUpdates}
        renderItem={({ item }) => (
          <UpdateCard
            title={item.title}
            summary={item.summary}
            level={item.level}
          />
        )}
        keyExtractor={item => item.id}
      />
      <Button title="Logout" onPress={handleLogout} color="#e74c3c" />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f8f8f8',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});

export default HomeScreen;
