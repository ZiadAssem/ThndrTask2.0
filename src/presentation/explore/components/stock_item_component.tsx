// StockItem.tsx
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { fetchStockDetails } from '../redux/stock_slice';
import { AppDispatch } from '../../../redux/redux_store';
import { AltTextComponent } from './alt_text_component';

interface StockItemProps {
  ticker: string;
  name: string;
}

const StockItem: React.FC<StockItemProps> = ({ ticker, name }) => {
  const dispatch = useDispatch<AppDispatch>();



  return (
    <View style={styles.stockItem}>
      <AltTextComponent ticker={ticker}></AltTextComponent>
      <Text style={styles.tickerText}>{ticker}</Text>

      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stockItem: {
    height: 150,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    backgroundColor: '#252739',
    borderRadius: 20,
    padding: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 10,
  },
  tickerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  nameText: {
    fontSize: 10,
    padding: 5,
    justifyContent: 'center',
    color: '#ccc',
  },
 
});

export default StockItem;
