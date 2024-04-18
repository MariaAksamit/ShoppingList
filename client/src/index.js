import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {Provider} from "./Provider"
import App from './App';
import ShoppingListR from "./routes/ShoppingListR";
import OverviewR from './routes/OverviewR';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route path="" element={<OverviewR />} />
            <Route path="/shoppingList/:id" element={<ShoppingListR />} />
            <Route path="/overview" element={<OverviewR />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();