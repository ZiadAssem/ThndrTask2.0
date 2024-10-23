// src/components/StockList.tsx

import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/redux_store';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { PolygonDataSource } from './data/sources/polygon_data_source';
import { GetStocksUseCase } from './domain/usecases/get_stocks';
import { StockRepository } from './data/repositories/stock_repository';
import StocksScreen from './presentation/explore/screens/stocks_screen';

const StockList = () => {



    return (
        <Provider store={store}>
            <View style={style.container}>
                <StocksScreen></StocksScreen>
            </View>
        </Provider>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e212f',
        padding: 10,
    },
});


export default StockList;

