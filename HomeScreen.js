// HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Button, FlatList, StyleSheet } from 'react-native';
import UpdateCard from './UpdateCard';
import { createClient } from 'contentful';

const client = createClient({
  space: 'h2jn9zusrpg1',
  accessToken: '1xdR2iLbukyAvpJwb3sTi7ueem2KXsLgYNx14XUO5lYn',
});

const HomeScreen = ({ user, handleLogout }) => {
  const [updates, setUpdates] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await client.getEntries({
          content_type: 'Updates',
        });

        const fetchedUpdates = response.items.map(item => ({
          id: item.sys.id,
          title: item.fields.title,
          summary: item.fields.content, // Changed `content` to `summary`
          level: item.fields.level,
        }));

        console.log("Fetched Updates:", fetchedUpdates);
        setUpdates(fetchedUpdates);
      } catch (error) {
        console.error('Error fetching updates from Contentful:', error);
      }
    };

    fetchUpdates();
  }, []);

  const filteredUpdates = updates.filter(update => filter === 'all' || update.level === filter);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.filterContainer}>
        {['all', 'school', 'grade', 'division', 'person'].map(level => (
          <Button key={level} title={level.toUpperCase()} onPress={() => setFilter(level)} />
        ))}
      </View>
      <FlatList
        data={filteredUpdates}
        renderItem={({ item }) => (
          <UpdateCard title={item.title} summary={item.summary} level={item.level} />
        )}
        keyExtractor={item => item.id}
      />
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
