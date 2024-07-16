import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// import { store, persistedStore } from '../app/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from './app/Store.ts';
import { persistedStore } from './app/Store';
  
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}> 
     <PersistGate loading={null} persistor={persistedStore}>
    <App />
    </PersistGate> 
 </Provider>
  </React.StrictMode>,
)
