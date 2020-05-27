import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {dishes} from './dishes';
import {comments} from './comments';
import {leaders} from './leaders';
import {promotions} from './promotions';
import {favorites} from './favorites';
import {persistCombineReducers, persistStore} from 'redux-persist';
//v5import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-community/async-storage';
export const ConfigureStore=()=>{
    const config={
        key:'root',
        storage:AsyncStorage,
        debug: true
    }

    const store=createStore(
        persistCombineReducers(config,{
            dishes,
            comments,
            leaders,
            promotions,
            favorites
        }),applyMiddleware(thunk, logger)
    );
    const persistor=persistStore(store);
    return {store, persistor};
}