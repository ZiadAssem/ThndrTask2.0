import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { fetchStocks } from '../presentation/explore/redux/stock_slice';
// import { getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import stocksReducer from '../presentation/explore/redux/stock_slice';

const rootReducer = combineReducers({
    stocks: stocksReducer,  // Stocks reducer
    // Add more reducers here if necessary``
});



const store = configureStore({
    reducer:{
        todo: rootReducer
    },

  

});

// Define the AppState type
export type AppState = ReturnType<typeof store.getState>;

// Create a type for the AppDispatch
export type AppDispatch = typeof store.dispatch;

export default store;
