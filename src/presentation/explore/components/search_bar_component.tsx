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
    backgroundColor: 'transparent', 
    borderRadius: 20, 
    padding: 10,
  },
  input: {
    height: 40,
    color: 'white', 
    backgroundColor: '#252739', 
    borderRadius: 20, 
    paddingHorizontal: 10,
  },
});

export default SearchBar;