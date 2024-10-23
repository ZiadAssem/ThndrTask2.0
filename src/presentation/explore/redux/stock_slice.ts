import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetStocksUseCase } from '../../../domain/usecases/get_stocks';
import { StockRepository } from '../../../data/repositories/stock_repository';
import { StockEntity } from '../../../domain/entities/stock_entity';

const stockRepository = new StockRepository();
const getStocksUseCase = new GetStocksUseCase(stockRepository);

// Async action
export const fetchStocks = createAsyncThunk('fetchStocks', async (limit:number) => {
    const stocks = await getStocksUseCase.execute(limit);
    // console.log('redux state');
    // console.log(stocks);

    return { stocks }; // Returns the list of stock entities
});

// Stocks State Interface
export interface StocksState {
    stocks: StockEntity[]; // Array of stock entities
    nextUrl: string | null;
    loading: boolean;
    error: string | null;
}

// Initial state
const initialState: StocksState = {
    stocks: [],
    nextUrl: null,
    loading: false,
    error: null,
};

// Reducer and actions
const stocksSlice = createSlice({
    name: 'stocks',
    initialState,
    reducers: {},
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
            });
    },
});

export default stocksSlice.reducer;
