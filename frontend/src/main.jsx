import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import { Toaster } from './components/ui/sonner.jsx';
import {  AppContextProvider } from './context/AppContextProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
     <Toaster richColors closeButton />
    </BrowserRouter>
  </React.StrictMode>,
);