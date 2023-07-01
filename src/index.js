import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css'
import './index.css';
import App from './App';
import bootstrap from "bootstrap"
import Factura from './components/Factura';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Nav from "./components/nav"
import Login from './components/login';
import SingUp from './components/singup';
import RutaPrivada from './components/RutaPrivada';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <BrowserRouter>
      <Nav></Nav>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/iniciar-sesion' element={<Login />}></Route>
        <Route path='/crear-cuenta' element={<SingUp />}></Route>
        <Route path="/crear-factura" element={
          <RutaPrivada>
            <Factura />
          </RutaPrivada>
        } />

      </Routes>
    </BrowserRouter>
  </AuthProvider>
);