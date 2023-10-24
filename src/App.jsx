import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import { ProductProvider } from './utils/productContext';

import { Layout } from './pages/Layout';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { ProductPage } from './pages/ProductPage';

import { colors } from './utils/constants';

import './App.css'

export const App = () => {
  return (
    <Router>
      <div className="App" style={{backgroundColor:colors.backgroundColor}}>
        <ProductProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='/administracion' element={<AdminPage />} />
              <Route path="/:productId" element={<ProductPage />} />
            </Route>
          </Routes>
        </ProductProvider>
      </div>
    </Router>
  )
}

