import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { GetStocksUseCase } from '../../../domain/usecases/get_stocks';
import { StockRepository } from '../../../data/repositories/stock_repository';
import { StockEntity } from '../../../domain/entities/stock_entity';
import { GetStockDetailsByTickerUseCase } from '../../../domain/usecases/get_stock_details_by_ticker';
import { StockDetailsEntity } from '../../../domain/entities/stock_details_entity';
import { GetMoreStocksUseCase } from '../../../domain/usecases/get_more_stocks';

const stockRepository = new StockRepository();
const getStocksUseCase = new GetStocksUseCase(stockRepository);
const getStockByTickerUseCase = new GetStockDetailsByTickerUseCase(stockRepository);
const getMoreStocksUseCase = new GetMoreStocksUseCase(stockRepository);

export const fetchStocks = createAsyncThunk('fetchStocks', async (limit: number) => {
    console.log('fetching');
    const stocks = await getStocksUseCase.execute(limit);
    return { stocks };
});

export const fetchStockByTicker = createAsyncThunk('fetchStockByTicker', async (ticker: string) => {
    const stock = await getStockByTickerUseCase.execute(ticker);
    return { stocks: [stock] };
});

export const fetchMoreStocks= createAsyncThunk('fetchMoreStocks', async (nextUrl: string) => {
    console.log('fetching more');
    const stocks = await getMoreStocksUseCase.execute(nextUrl);
    return { stocks };
}
);
export interface StocksState {
    stockDetails: StockDetailsEntity | null;
    stocks: StockEntity[];
    nextUrl: string | null;
    loading: boolean;
    loadingMore:boolean;
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
                state.stocks = Array.from(existingStocksMap.values()); // Convert back to array
            })
            .addCase(fetchStocks.rejected, (state) => {
                state.loading = false;
                state.error = 'Failed to fetch stocks';
            })


            .addCase(fetchStockByTicker.pending, (state) => {
                console.log(`fetching more`);
                state.loadingMore = true;
                state.loading = false;
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
            }
        )
            .addCase(fetchMoreStocks.fulfilled, (state, action) => {
                state.loadingMore = false;
                const existingStocksMap = new Map(state.stocks.map((stock) => [stock.ticker, stock]));
                action.payload.stocks['stocks'].forEach((stock) => {
                    existingStocksMap.set(stock.ticker, stock);
                });
                state.nextUrl = action.payload.stocks['nextUrl'];
                state.stocks = Array.from(existingStocksMap.values()); // Convert back to array
            })
    },
});

export const { setSearchedStock } = stocksSlice.actions;

export default stocksSlice.reducer;
