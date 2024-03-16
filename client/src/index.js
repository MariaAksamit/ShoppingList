import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Provider} from "./Provider"
import App from './App';
import Overview from "./routes/Overview"
import ShoppingList from './routes/ShoppingList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<Overview/>} />
            <Route path="shoppingList" element={<ShoppingList/>} />
            <Route path="overview" element={<Overview/>} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();