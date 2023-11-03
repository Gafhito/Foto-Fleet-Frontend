import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom'; // Asegúrate de importar Navigate
import { ProductProvider } from './utils/productContext';
import { Layout } from './pages/Layout';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { ProductPage } from './pages/ProductPage';
import { colors } from './utils/constants';
import './App.css';
import { LoginPage } from './pages/LoginPage';

export const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Agrega un estado para rastrear el inicio de sesión

  return (
    <Router>
      <div className="App" style={{ backgroundColor: colors.backgroundColor }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/administracion" element={<AdminPage />}/>
            <Route path="/:productId" element={<ProductPage />} />
            <Route path="/auth/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};