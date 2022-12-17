import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';

const element = document.getElementById('root');
const root = ReactDom.createRoot(element);

root.render(  
  <React.StrictMode>
    <App />
  </React.StrictMode>
)