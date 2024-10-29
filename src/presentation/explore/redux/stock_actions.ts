// src/store/actions/stockActions.ts
import { StockDetailsEntity } from '../../../domain/entities/stock_details_entity';
import { StockEntity } from '../../../domain/entities/stock_entity';

export const setSearchedStock = (stock: StockDetailsEntity | null) => ({
  type: 'stocks/setSearchedStock',
  payload: stock,
});

export interface StocksState {
  stockDetails: StockDetailsEntity | null;
  stocks: StockEntity[];
  nextUrl: string | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
}
