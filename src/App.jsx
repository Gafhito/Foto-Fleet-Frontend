import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import { Layout } from './pages/Layout';

import './App.css'

export const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

