import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ProductProvider } from './utils/ProductContext';
import { Layout } from './pages/Layout';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { ProductPage } from './pages/ProductPage';
import { colors } from './utils/constants';
import './App.css';
import { LoginPage } from './pages/LoginPage';
import { UserProfile } from './components/UserInfo/UserProfile';
import { FavoritesPage } from './pages/FavoritesPage';
import { Rentals } from './pages/RentalsPage';
import { Politics } from './pages/Politics';

import { useAuth } from './utils/AuthContext';

export const App = () => {
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    const checkScrollbar = () => {
      // Check if the document height exceeds the viewport height
      if (document.documentElement.scrollHeight > window.innerHeight) {
        document.body.classList.add('max-width-scrollbar');
      } else {
        document.body.classList.remove('max-width-scrollbar');
      }
    };

    // Initial check
    checkScrollbar();

    // Event listener for changes in the content (in case of dynamic content updates)
    document.addEventListener('DOMSubtreeModified', checkScrollbar);

    // Cleanup function to remove the class and event listener when the component unmounts
    return () => {
      document.body.classList.remove('max-width-scrollbar');
      document.removeEventListener('DOMSubtreeModified', checkScrollbar);
    };
  }, []);

  return (
    <Router>
      <div className="App" style={{}}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route
              path="/administracion"
              element={isLoggedIn ? <AdminPage /> : <Navigate to="/" />}
            />
            <Route path="/products/:productId" element={<ProductPage />} />
            <Route path="/auth/login" element={<LoginPage />} />
            <Route path="/perfil" element={<UserProfile />} />
            <Route path="/favoritos" element={<FavoritesPage />} />
            <Route path="/user/rentals" element={<Rentals />} />

            <Route path="/politicas" element={<Politics />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};
