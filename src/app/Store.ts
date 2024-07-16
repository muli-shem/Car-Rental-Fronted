// store.ts

import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import userProfileReducer from '../Features/UserProfile/userProfileSlice';

// Configure persist options
const persistConfig = {
  key: 'root', // Key for storage
  storage, // Storage method (localStorage by default)
};

// Create a persisted reducer
export const persistedReducer = persistReducer(persistConfig, userProfileReducer);

// Configure store with persisted reducer
const store = configureStore({
  reducer: {
    userProfile: persistedReducer, // Reducer with persistence
    // other reducers if any
  },
});

// Create a persisted store
 const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistedStore };
