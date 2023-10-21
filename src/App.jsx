import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import { Layout } from './pages/Layout';
import { HomePage } from './pages/HomePage';

import './App.css'

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

