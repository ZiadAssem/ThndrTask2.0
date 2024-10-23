import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { fetchStocks } from '../presentation/explore/redux/stock_slice';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import stocksReducer from '../presentation/explore/redux/stock_slice';

const rootReducer = combineReducers({
    stocks: stocksReducer,

});

const store = configureStore({
    reducer: {
        todo: rootReducer
    },
});

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
