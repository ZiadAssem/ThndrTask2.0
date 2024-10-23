import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks, StocksState } from '../redux/stock_slice';
import StockItem from '../components/stock_item_component';
import { AppDispatch } from '../../../redux/redux_store';
import { StockEntity } from '../../../domain/entities/stock_entity';
import * as Progress from 'react-native-progress';

const StocksScreen = () => {
  const [moreStocksLoading, setMoreStocksLoading] = useState(false); // Pagination loading
  const [limit, setLimit] = useState(30); // Start with a limit of 30
  const loading = useSelector((state: StocksState) => state.loading); // Initial load flag
  const error = useSelector((state: any) => state.todo.stocks.error);
  const stocks: StockEntity[] = useSelector((state: any) => state.todo.stocks.stocks);
  const dispatch = useDispatch<AppDispatch>();

  // Fetch stocks initially and whenever limit changes
  useEffect(() => {
    const fetchStocksData = async () => {
      if (!loading) { // Ensure only one fetch happens at a time
        try {
          await dispatch(fetchStocks(limit)); // Fetch stocks based on the limit
        } catch (error) {
          console.error('Failed to fetch stocks:', error);
        }
      }
    };
    fetchStocksData();
  }, [dispatch, limit]);

  // Function to load more stocks when reaching the end of the list
  const loadMoreStocks = () => {
    if (!moreStocksLoading && !loading) { // Prevent triggering if already loading
      setMoreStocksLoading(true); // Set loading for pagination
      setLimit((prevLimit) => prevLimit + 20); // Increase limit by 20
    }
  };

  // Fetch additional stocks once limit is updated
  useEffect(() => {
    const fetchMoreStocks = async () => {
      if (moreStocksLoading) {
        try {
          await dispatch(fetchStocks(limit)); // Fetch stocks with the updated limit
        } catch (error) {
          console.error('Failed to fetch more stocks:', error);
        } finally {
          setMoreStocksLoading(false); // Reset pagination loading state
        }
      }
    };
    fetchMoreStocks();
  }, [limit, dispatch, moreStocksLoading]);

  return (
    <View style={loading && !stocks.length ? styles.container : null}>
      {loading && !stocks.length ? (
        <Progress.Circle size={30} indeterminate={true} />
      ) : stocks.length ? (
        <FlatList
          data={stocks}
          numColumns={2}
          renderItem={({ item }) => (
            <StockItem ticker={item.ticker} name={item.name} />
          )}
          keyExtractor={(item) => item.ticker}
          onEndReached={loadMoreStocks} // Load more stocks on end reached
          onEndReachedThreshold={0.5} // Trigger when 50% of the screen height is reached
          ListFooterComponent={moreStocksLoading ? <Progress.Circle size={30} indeterminate={true} /> : null}
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
    flex: 1,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
});

export default StocksScreen;
