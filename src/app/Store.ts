// store.ts

import { configureStore} from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { VehicleAPI } from '../Features/Vehicles/VehicleAPI';
import userProfileReducer from '../Features/UserProfile/userProfileSlice';
import { bookingAPI } from '../Features/Booking/BookingAPI';
import { userAPI } from '../Features/Users/userAPI';
import { allvehiclespcisAPI } from '../Features/AdminVehicles/allvehiclespcisAPI';
import { ticketAPI } from '../Features/Tickets/ticketAPI';
import { bookingsAPI, paymentAPI } from '../Features/BookCard/bookingsAPI';
import { paysAPI } from '../Features/Payments/paysAPI';


// Configure persist options
const persistConfig = {
  key: 'root', // Key for storage
  storage, // Storage method (localStorage by default)
};

export const persistedReducer = persistReducer(persistConfig, userProfileReducer );

// Configure store with persisted reducer
 const store = configureStore({
  reducer: {
    userProfile: persistedReducer, 
  [VehicleAPI.reducerPath]:VehicleAPI.reducer,
  [bookingAPI.reducerPath]:bookingAPI.reducer,
  [userAPI.reducerPath]:userAPI.reducer,
  [allvehiclespcisAPI.reducerPath]:allvehiclespcisAPI.reducer,
  [ticketAPI.reducerPath]:ticketAPI.reducer,
  [bookingsAPI.reducerPath]: bookingsAPI.reducer,
  [paymentAPI.reducerPath]:paymentAPI.reducer,
  [paysAPI.reducerPath]:paysAPI.reducer
  
  },
  middleware: (getdefaultMiddleware)=>
  getdefaultMiddleware().concat(VehicleAPI.middleware, bookingAPI.middleware,userAPI.middleware,allvehiclespcisAPI.middleware, 
    ticketAPI.middleware,paymentAPI.middleware, bookingsAPI.middleware, paysAPI.middleware),
});

// Create a persisted store
 const persistedStore = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, persistedStore };
