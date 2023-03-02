import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { RadioProvider } from './Context/RadioContext';
import {Header} from './Components/header/header'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RadioProvider>
        <App />
    </RadioProvider>
  </React.StrictMode>

);


