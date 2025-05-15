import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/context/Auth';
import { CartProvider } from './components/context/cart';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <AuthProvider>
            <CartProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </CartProvider>
        </AuthProvider>
    </>
);

