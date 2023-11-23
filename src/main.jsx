import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App.jsx'
import { LoginFormProvider } from './utils/LoginFormContext.jsx';
import { ProductProvider } from './utils/ProductContext.jsx';
import './index.css'
import { AuthProvider } from './utils/AuthContext.jsx';
import { HelmetProvider } from 'react-helmet-async';
import { RentalProvider } from './utils/RentalContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>
    <HelmetProvider>
      <AuthProvider>
          <ProductProvider>
            <RentalProvider>
              <LoginFormProvider>
                <App />
              </LoginFormProvider>
            </RentalProvider>
          </ProductProvider>
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
