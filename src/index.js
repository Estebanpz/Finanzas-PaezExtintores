import React from 'react';
import ReactDOM from 'react-dom/client';
import * as bootstrap from "bootstrap"
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import Factura from './components/Factura';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Nav from "./components/nav"
import Login from './components/login';
import SingUp from './components/singup';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <>
      <AuthProvider>
        <BrowserRouter>
          <Nav></Nav>
          <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/iniciar-sesion' element={<Login />}></Route>
            <Route path='/crear-cuenta' element={<SingUp />}></Route>
            <Route path='/crear-factura' element={<Factura />}></Route>

          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  </React.StrictMode>
);