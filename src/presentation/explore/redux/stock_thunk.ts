// src/store/thunks/stockThunks.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { GetStocksUseCase } from '../../../domain/usecases/get_stocks';
import { StockRepository } from '../../../data/repositories/stock_repository';
import { GetStockDetailsByTickerUseCase } from '../../../domain/usecases/get_stock_details_by_ticker';
import { GetMoreStocksUseCase } from '../../../domain/usecases/get_more_stocks';

const stockRepository = new StockRepository();
const getStocksUseCase = new GetStocksUseCase(stockRepository);
const getStockByTickerUseCase = new GetStockDetailsByTickerUseCase(stockRepository);
const getMoreStocksUseCase = new GetMoreStocksUseCase(stockRepository);

export const fetchStocks = createAsyncThunk('stocks/fetchStocks', async (limit: number) => {
  const stocks = await getStocksUseCase.execute(limit);
  return { stocks };
});

export const fetchStockByTicker = createAsyncThunk('stocks/fetchStockByTicker', async (ticker: string) => {
  const stock = await getStockByTickerUseCase.execute(ticker);
  return { stocks: [stock] };
});

export const fetchMoreStocks = createAsyncThunk('stocks/fetchMoreStocks', async (nextUrl: string) => {
  const stocks = await getMoreStocksUseCase.execute(nextUrl);
  return { stocks };
});
