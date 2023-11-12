import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { LoginFormProvider } from './utils/LoginFormContext.jsx';
import { ProductProvider } from './utils/ProductContext.jsx';
import './index.css'
import { AuthProvider } from './utils/AuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ProductProvider>
        <LoginFormProvider>
          <App />
        </LoginFormProvider>
      </ProductProvider>
    </AuthProvider>
  </React.StrictMode>,
)
