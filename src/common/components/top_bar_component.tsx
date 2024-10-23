import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface TopBarProps {
  imageSource: any; // Replace with the appropriate type for your image source
}

const TopBar: React.FC<TopBarProps> = ({ imageSource }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignContent:'left',
    backgroundColor: '#191927', // Adjust the background color as needed
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 120, // Adjust the width as needed
    height: 40, // Adjust the height as needed
  },
});

export default TopBar;