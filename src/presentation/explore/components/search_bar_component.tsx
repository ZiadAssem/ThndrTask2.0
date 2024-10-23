import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch }) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search for stocks"
        value={searchQuery}
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // Dark background color
    borderRadius: 20, // Rounded corners
    padding: 10,
  },
  input: {
    height: 40,
    color: 'white', // White text color
    backgroundColor: '#252739', // Slightly lighter background color
    borderRadius: 20, // Rounded corners
    paddingHorizontal: 10,
  },
});

export default SearchBar;