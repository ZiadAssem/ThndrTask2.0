// import { Dispatch } from 'redux';
// import {
//     FETCH_STOCKS_REQUEST,
//     FETCH_STOCKS_SUCCESS,
//     FETCH_STOCKS_FAILURE,
//     StockActionTypes,
// } from './types';
// import { StockRepository } from '../../../data/repositories/stock_repository';

// export const fetchStocks = () => {
//     return async (dispatch: Dispatch<StockActionTypes>) => {
//         dispatch({ type: FETCH_STOCKS_REQUEST });
        
//         try {
//             const stockRepository = new StockRepository();
//             const stocks = await stockRepository.getStocks();  // Fetches stocks as entities

//             dispatch({
//                 type: FETCH_STOCKS_SUCCESS,
//                 payload: stocks,  // Populate with the stock entities
//             });
//         } catch (error) {
//             dispatch({
//                 type: FETCH_STOCKS_FAILURE,
//                 payload: 'Failed to fetch stocks',
//             });
//         }
//     };
// };
