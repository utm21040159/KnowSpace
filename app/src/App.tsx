import './App.css';
import { Login } from './components/Login';
import {Registro} from './components/Registro';
import { CrearPublicacion } from './components/publicacione';
import { Inicio } from './components/Inicio'; 
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React, { useState } from 'react';
import { IPubli } from './Types';

function App() {
  const [publicaciones, setPublicaciones] = useState<IPubli[]>([]); // ✅ useState dentro del componente

  const router = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/registro", element: <Registro /> },
    { path: "/publicacion", element: <CrearPublicacion setPublicaciones={setPublicaciones} /> },
    { path: "/inicio", element: <Inicio /> }
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;

