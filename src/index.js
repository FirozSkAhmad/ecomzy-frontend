import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from "react-router-dom"
import { Provider } from "react-redux"
import { Store } from './redux/Store';
import appRouter from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={Store}>
    <RouterProvider router={appRouter} />
  </Provider>
);