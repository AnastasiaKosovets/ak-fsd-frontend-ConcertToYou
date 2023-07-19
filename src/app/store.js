import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from '../pages/userSlice';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
    user: userSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer
  );

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export const persistor = persistStore(store)