import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

interface TopBarProps {
  imageSource: any; 
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
    backgroundColor: '#191927', 
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: 120, 
    height: 40, 
  },
});

export default TopBar;