import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from 'react-router-dom'; // Asegúrate de importar Navigate
import { ProductProvider } from './utils/ProductContext';
import { Layout } from './pages/Layout';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { ProductPage } from './pages/ProductPage';
import { colors } from './utils/constants';
import './App.css';
import { LoginPage } from './pages/LoginPage';
import { UserProfile } from './components/UserInfo/UserProfile';

import { useAuth } from './utils/AuthContext';

export const App = () => {

  const { isLoggedIn } = useAuth();

  return (
    <Router>
      <div className="App" style={{}}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            {/* Protegemos ruta /administracion */}
            <Route path="/administracion" element={ isLoggedIn ? <AdminPage /> : <Navigate to="/" />}
            />
            <Route path="products/:productId" element={<ProductPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/perfil" element={<UserProfile/>} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};