import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetStocksUseCase } from '../../../domain/usecases/get_stocks';
import { StockRepository } from '../../../data/repositories/stock_repository';
import { StockEntity } from '../../../domain/entities/stock_entity';
import { GetStockDetailsByTickerUseCase } from '../../../domain/usecases/get_stock_details_by_ticker'; // Import your use case
import { StockDetailsEntity } from '../../../domain/entities/stock_details_entity';

const stockRepository = new StockRepository();
const getStocksUseCase = new GetStocksUseCase(stockRepository);
const getStockByTickerUseCase = new GetStockDetailsByTickerUseCase(stockRepository); // Instantiate use case

// Async action for fetching all stocks
export const fetchStocks = createAsyncThunk('fetchStocks', async (limit: number) => {
    const stocks = await getStocksUseCase.execute(limit);
    return { stocks }; // Returns the list of stock entities
});

// Async action for fetching a stock by ticker
export const fetchStockByTicker = createAsyncThunk('fetchStockByTicker', async (ticker: string) => {
    const stock = await getStockByTickerUseCase.execute(ticker); // Implement this use case
    return { stocks: [stock] }; // Return the stock in an array to maintain the structure
});

// Stocks State Interface
export interface StocksState {
    stockDetails: StockDetailsEntity | null
    stocks: StockEntity[]; // Array of stock entities
    nextUrl: string | null;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: StocksState = {
    stockDetails: null,
    stocks: [],
    nextUrl: null,
    loading: false,
    error: null,
};

// Reducer and actions
const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {
        setSearchedStock: (state, action) => {
            state.stockDetails = action.payload; // Set searchedStock to null (payload is null)
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchStocks.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchStocks.fulfilled, (state, action) => {
                state.loading = false;

                // Combine new stocks with existing stocks, avoiding duplicates
                const existingStocksMap = new Map(state.stocks.map(stock => [stock.ticker, stock]));
                action.payload.stocks['stocks'].forEach(stock => {
                    existingStocksMap.set(stock.ticker, stock);
                });
                state.nextUrl = action.payload.stocks['nextUrl'];
                state.stocks = Array.from(existingStocksMap.values()); // Convert back to array
            })
            .addCase(fetchStocks.rejected, (state) => {
                state.loading = false;
                state.error = `Failed to fetch stocks`;
            })
            .addCase(fetchStockByTicker.fulfilled, (state, action) => {
                state.loading = false;
                state.stockDetails = action.payload.stocks[0]; // Set the stock returned by the search
                if (state.stockDetails) {
                    console.log(`logging state ${state.stockDetails.name} `);
                }
            })
            .addCase(fetchStockByTicker.rejected, (state) => {
                state.loading = false;
                state.error = `Failed to fetch stock`;
            });
    },
});

export default stocksSlice.reducer;
