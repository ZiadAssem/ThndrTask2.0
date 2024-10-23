// // Action types
// export const FETCH_STOCKS_REQUEST = 'FETCH_STOCKS_REQUEST';
// export const FETCH_STOCKS_SUCCESS = 'FETCH_STOCKS_SUCCESS';
// export const FETCH_STOCKS_FAILURE = 'FETCH_STOCKS_FAILURE';

// // Stock entity interface (similar to your domain entity)
// export interface Stock {
//     ticker: string;
//     name: string;
// }

// // State interface
// export interface StocksState {
//     loading: boolean;
//     stocks: Stock[];
//     error: string | null;
// }

// // Action interfaces
// interface FetchStocksRequestAction {
//     type: typeof FETCH_STOCKS_REQUEST;
// }

// interface FetchStocksSuccessAction {
//     type: typeof FETCH_STOCKS_SUCCESS;
//     payload: Stock[];
// }

// interface FetchStocksFailureAction {
//     type: typeof FETCH_STOCKS_FAILURE;
//     payload: string;
// }

// export type StockActionTypes =
//     | FetchStocksRequestAction
//     | FetchStocksSuccessAction
//     | FetchStocksFailureAction;
