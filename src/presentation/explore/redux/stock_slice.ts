// src/store/slices/stocksSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { StockDetailsEntity } from '../../../domain/entities/stock_details_entity';
import { StockEntity } from '../../../domain/entities/stock_entity';
import { fetchStocks, fetchStockByTicker, fetchMoreStocks} from '../redux/stock_thunk'

export interface StocksState {
  stockDetails: StockDetailsEntity | null;
  stocks: StockEntity[];
  nextUrl: string | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}

const initialState: StocksState = {
  stockDetails: null,
  stocks: [],
  nextUrl: null,
  loading: true,
  loadingMore: false,
  error: null,
};

const stocksSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setSearchedStock: (state, action) => {
      state.stockDetails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        const existingStocksMap = new Map(state.stocks.map((stock) => [stock.ticker, stock]));
        action.payload.stocks['stocks'].forEach((stock) => {
          existingStocksMap.set(stock.ticker, stock);
        });
        state.nextUrl = action.payload.stocks['nextUrl'];
        state.stocks = Array.from(existingStocksMap.values());
      })
      .addCase(fetchStocks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch stocks';
      })
      .addCase(fetchStockByTicker.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(fetchStockByTicker.fulfilled, (state, action) => {
        state.loadingMore = false;
        state.stockDetails = action.payload.stocks[0];
      })
      .addCase(fetchStockByTicker.rejected, (state) => {
        state.loadingMore = false;
        state.error = 'Failed to fetch stock';
      })
      .addCase(fetchMoreStocks.pending, (state) => {
        state.loadingMore = true;
      })
      .addCase(fetchMoreStocks.fulfilled, (state, action) => {
        state.loadingMore = false;
        const existingStocksMap = new Map(state.stocks.map((stock) => [stock.ticker, stock]));
        action.payload.stocks['stocks'].forEach((stock) => {
          existingStocksMap.set(stock.ticker, stock);
        });
        state.nextUrl = action.payload.stocks['nextUrl'];
        state.stocks = Array.from(existingStocksMap.values());
      });
  },
});

export const { setSearchedStock } = stocksSlice.actions;
export default stocksSlice.reducer;
