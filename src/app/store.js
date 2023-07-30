import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice } from '../pages/userSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import persistStore from "redux-persist/es/persistStore";

const persistConfig = {
  key: 'root',
  storage,
}
const rootReducer = combineReducers({
  user: userSlice.reducer,
})
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/FLUSH', 'persist/REHYDRATE', 'persist/PERSIST', 'persist/PERSIST_ERROR'],
      },
    }),
})
export const persistor = persistStore(store)