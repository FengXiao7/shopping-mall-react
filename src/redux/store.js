import {createStore,applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import AllReducer from './reducer'


//持久化配置
const persistConfig = {
    key: 'CategoryList',
    storage,
    //白名单，只持久化三级联动,注意这里是combineReducers里面的键喔
    whitelist:['CategoryListState']
}

// 改造我们的reducer
const persistedReducer = persistReducer(persistConfig, AllReducer)

const store=createStore(persistedReducer,composeWithDevTools(applyMiddleware(thunk)))

let persistor = persistStore(store)

export  { store, persistor }