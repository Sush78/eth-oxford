import React from 'react'
import ReactDOM from 'react-dom';
import AppRouter from './Router';
import './index.css'
import { TransactionProvider } from './context/TransactionContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <TransactionProvider>
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
  </TransactionProvider>
)
