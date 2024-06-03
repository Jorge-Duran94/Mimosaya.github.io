import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterApp } from './RouterApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import {PayPalScriptProvider} from '@paypal/react-paypal-js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PayPalScriptProvider
    options={{

      clientId: "AbJ5H-8vqprPtrZqaijyiOkBZM71I0AzX9DvpeCSrWSL_OLO-RPrb_OBVpNNOXbRwX1iS7jT38FegyRU"
    }}
    >
    <BrowserRouter>
  <RouterApp />
    </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>
)
