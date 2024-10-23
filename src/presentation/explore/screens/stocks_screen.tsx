import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks, fetchStockByTicker, fetchMoreStocks, StocksState } from '../redux/stock_slice';
import StockItem from '../components/stock_item_component';
import { AppDispatch } from '../../../redux/redux_store';
import * as Progress from 'react-native-progress';
import SearchBar from '../components/search_bar_component';

const StocksScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [limit, setLimit] = useState(30);

  const dispatch = useDispatch<AppDispatch>();
  
  const loading = useSelector((state: any) => state.todo.stocks.loading);
  const moreStocksLoading = useSelector((state:any)=>state.todo.stocks.loadingMore);
  const error = useSelector((state: any) => state.todo.stocks.error);
  const stocks = useSelector((state: any) => state.todo.stocks.stocks);
  const searchedStock = useSelector((state: any) => state.todo.stocks.stockDetails);
  const nextUrl = useSelector((state: any) => state.todo.stocks.nextUrl);

  // Fetch stocks when the component mounts
  useEffect(() => {
    const fetchStocksData = async () => {
      if (!searchQuery && stocks.length === 0) { // Only fetch if no search query and no stocks loaded
        try {
          await dispatch(fetchStocks(limit)); // Fetch initial stocks
        } catch (error) {
          console.error('Failed to fetch stocks:', error);
        }
      }
    };
    fetchStocksData();
  }, [dispatch, limit, searchQuery]);

  // Load more stocks when the user scrolls to the bottom
  const loadMoreStocks = () => {
    if (!loading && !moreStocksLoading && nextUrl && !searchQuery) {
      dispatch(fetchMoreStocks(nextUrl)); // Fetch more stocks using nextUrl
    }
  };

  // Search handler for stocks by ticker
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      dispatch(fetchStockByTicker(query));
    } else {
      dispatch({ type: 'stocks/setSearchedStock', payload: null });
      setLimit(30); // Reset limit when clearing search
    }
  };

  return (
    <View style={searchedStock ? styles.searchedContainer : styles.container}>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      {loading && !moreStocksLoading ? (
        <View style={styles.loadingOverlay}>
          <Progress.Circle size={30} indeterminate={true} />
        </View>
      ) : searchedStock ? (
        <StockItem ticker={searchedStock.ticker} name={searchedStock.name} searched={true} />
      ) : stocks.length ? (
        <FlatList
          data={stocks}
          numColumns={2}
          renderItem={({ item }) => <StockItem ticker={item.ticker} name={item.name} searched={false} />}
          keyExtractor={(item) => item.ticker}
          onEndReached={loadMoreStocks} // Load more stocks when reaching the end
          onEndReachedThreshold={0.5} // Trigger when 50% of the screen height is reached
          ListFooterComponent={moreStocksLoading ? (
            <View style={styles.loadingOverlay}>
              <Progress.Circle size={30} indeterminate={true} />
            </View>
          ) : null}
        />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <Text>No stocks found</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
  },
  searchedContainer: {
    width: '100%',
    height: 250,
    alignSelf: 'auto',
    alignContent: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StocksScreen;
