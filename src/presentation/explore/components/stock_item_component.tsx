
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { AltTextComponent } from './alt_text_component';

interface StockItemProps {
  ticker: string;
  name: string;
  searched: boolean;
}

const StockItem: React.FC<StockItemProps> = ({ ticker, name,searched}) => {

  if(!searched){
  return (
    <View style={styles.stockItem }>
      <AltTextComponent ticker={ticker}></AltTextComponent>
      <Text style={styles.tickerText}>{ticker}</Text>

      <Text style={styles.nameText}>{name}</Text>
    </View>
  );
}else{
  return(<View style = {styles.stockItemSearched}  >
    <AltTextComponent ticker={ticker}></AltTextComponent>
    <Text style={styles.tickerText}>{ticker}</Text>
    <Text style={styles.nameText}>{name}</Text>
    </View>)
}
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
  stockItemSearched: {
    
    height: 150,
    width:'50%',
    flex: 1,
    alignItems: 'center',
    alignSelf:'center',

    justifyContent: 'center',
    margin: 'auto',
    paddingBottom:'auto',
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
    textAlign: 'center', 
  },
  nameText: {
    fontSize: 10,
    padding: 5,
    justifyContent: 'center',
    color: '#ccc',
    textAlign: 'center', // Ensure text is centered
  },
});

export default StockItem;
