import './App.css';
import { Login } from './components/Login';
import { Registro } from './components/Registro';
import { CrearPublicacion } from './components/publicacione';
import { Inicio } from './components/Inicio'; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from 'react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/publicacion",
    element: <CrearPublicacion />,                                                         
  },
  {
    path: "/inicio",
    element: <Inicio />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
