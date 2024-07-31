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
          content_type: 'Updates' // Replace with your actual content type ID for updates
        });

        const fetchedUpdates = await Promise.all(response.items.map(async (item) => {
          const fullUpdate = await client.getEntry(item.sys.id);
          console.log(fetchedUpdates)
          return {
            id: fullUpdate.sys.id,
            title: fullUpdate.fields.title,
            content: fullUpdate.fields.content,
            level: fullUpdate.fields.level,
            // Add any other fields you want to display
          };
        }));

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
        <Button title="All" onPress={() => setFilter('all')} />
        <Button title="School" onPress={() => setFilter('school')} />
        <Button title="Grade" onPress={() => setFilter('grade')} />
        <Button title="Division" onPress={() => setFilter('division')} />
        <Button title="Person" onPress={() => setFilter('person')} />
      </View>
      <FlatList
        data={filteredUpdates}
        renderItem={({ item }) => (
          <UpdateCard
            title={item.title}
            content={item.content}
            level={item.level}
            // Pass any other props to UpdateCard as needed
          />
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