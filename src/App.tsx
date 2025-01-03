// src/components/StockList.tsx

import React, { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './redux/redux_store';
import { View, StyleSheet, StatusBar} from 'react-native';
import StocksScreen from './presentation/explore/screens/stocks_screen';
import TopBar from './common/components/top_bar_component';
import SplashScreen from 'react-native-splash-screen';

const myImageSource = '../assets/images/nasdaq.png';
const StockList = () => {
    useEffect(() => {
        SplashScreen.hide();
    }
);

    return (
        <Provider store={store}>
            <View >
            <StatusBar barStyle="light-content" backgroundColor={'#191927'} />
                <TopBar imageSource={require(myImageSource)}></TopBar>
                </View>
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

