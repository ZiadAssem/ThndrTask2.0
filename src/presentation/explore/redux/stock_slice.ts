import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetStocksUseCase } from '../../../domain/usecases/get_stocks';
import { StockRepository } from '../../../data/repositories/stock_repository';
import { StockEntity } from '../../../domain/entities/stock_entity';
import { GetStockDetailsByTickerUseCase } from '../../../domain/usecases/get_stock_details_by_ticker';
import { StockDetailsEntity } from '../../../domain/entities/stock_details_entity';

const stockRepository = new StockRepository();
const getStocksUseCase = new GetStocksUseCase(stockRepository);
const getStockByTickerUseCase = new GetStockDetailsByTickerUseCase(stockRepository);

export const fetchStocks = createAsyncThunk('fetchStocks', async (limit: number) => {
  const stocks = await getStocksUseCase.execute(limit);
  return { stocks };
});

export const fetchStockByTicker = createAsyncThunk('fetchStockByTicker', async (ticker: string) => {
  const stock = await getStockByTickerUseCase.execute(ticker);
  return { stocks: [stock] };
});

export interface StocksState {
  stockDetails: StockDetailsEntity | null;
  stocks: StockEntity[];
  nextUrl: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: StocksState = {
  stockDetails: null,
  stocks: [],
  nextUrl: null,
  loading: true,
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
                state.stocks = Array.from(existingStocksMap.values()); // Convert back to array
      })
      .addCase(fetchStocks.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch stocks';
      })
      .addCase(fetchStockByTicker.fulfilled, (state, action) => {
        state.loading = false;
        state.stockDetails = action.payload.stocks[0];
      })
      .addCase(fetchStockByTicker.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch stock';
      });
  },
});

export const { setSearchedStock } = stocksSlice.actions;

export default stocksSlice.reducer;
