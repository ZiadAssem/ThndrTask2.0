import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStocks, fetchStockByTicker, StocksState } from '../redux/stock_slice';
import StockItem from '../components/stock_item_component';
import { AppDispatch } from '../../../redux/redux_store';
import { StockEntity } from '../../../domain/entities/stock_entity';
import * as Progress from 'react-native-progress';
import SearchBar from '../components/search_bar_component'; // Import the SearchBar component
import { StockDetailsEntity } from '../../../domain/entities/stock_details_entity';

const StocksScreen = () => {
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [moreStocksLoading, setMoreStocksLoading] = useState(false); // Pagination loading
  const [limit, setLimit] = useState(30); // Start with a limit of 30
  const loading = useSelector((state: StocksState) => state.loading); // Initial load flag
  const error = useSelector((state: any) => state.todo.stocks.error);
  const stocks: StockEntity[] = useSelector((state: any) => state.todo.stocks.stocks);
  const searchedStock: StockDetailsEntity | null = useSelector((state: any) => state.todo.stocks.stockDetails);
  const dispatch = useDispatch<AppDispatch>();
  console.log(searchedStock?.name);

  // Function to handle search input changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query) {
      dispatch(fetchStockByTicker(query)); // Fetch stock by ticker if there's a query
    } else {
      dispatch({ type: 'stocks/setSearchedStock', payload: null });

      setLimit(30); // Reset the limit if the search bar is empty
    }
  };

  // Fetch stocks initially and whenever limit changes
  useEffect(() => {
    const fetchStocksData = async () => {
      if (!loading && !searchQuery) { // Only fetch if no search query
        try {
          await dispatch(fetchStocks(limit)); // Fetch stocks based on the limit
        } catch (error) {
          console.error('Failed to fetch stocks:', error);
        }
      }
    };
    fetchStocksData();
  }, [dispatch, limit, searchQuery]);

  // Function to load more stocks when reaching the end of the list
  const loadMoreStocks = () => {
    if (!moreStocksLoading && !loading && !searchQuery) { // Prevent triggering if already loading or searching
      setMoreStocksLoading(true); // Set loading for pagination
      setLimit((prevLimit) => prevLimit + 20); // Increase limit by 20
    }
  };

  // Fetch additional stocks once limit is updated
  useEffect(() => {
    const fetchMoreStocks = async () => {
      if (moreStocksLoading && !searchQuery) { // Only fetch more stocks if no search query
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
  }, [limit, dispatch, moreStocksLoading, searchQuery]);

  return (
    <View style={loading && !stocks.length ? null : (searchedStock ? styles.searchedContainer : styles.container)}>
      <SearchBar searchQuery={searchQuery} onSearch={handleSearch} />
      {loading && !stocks.length ? (
        <Progress.Circle size={30} indeterminate={true} />
      )
         :
        searchedStock?(
            <StockItem ticker={searchedStock.ticker} name={searchedStock.name}searched={true} />
        )

        : stocks.length ? (
          <FlatList
            data={stocks}
            numColumns={2}
            renderItem={({ item }) => (
              <StockItem ticker={item.ticker} name={item.name} searched={false} />
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
    width: '100%',
    flex: 1,
    alignSelf: 'baseline',
     alignContent: 'stretch',
    // justifyContent: 'center',
  },

  searchedContainer:{
    width:'100%',
    height:250,
    alignSelf:'auto',
    alignContent: 'center',
    // justifyContent: 'center',
  }
});

export default StocksScreen;
