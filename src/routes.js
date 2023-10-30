import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { UsuarioContext } from 'common/context/Usuario'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { useState } from "react";

const Router = () => {
    const [nome, setNome] = useState('')
    const [saldo, setSaldo] = useState(0)
    
    const router =  createBrowserRouter([
        {
          path: "/",
          element: <Login/>
        },
        {
          path: "/feira",
          element: <Feira/>
        },
        {
          path: "/carrinho",
          element: <Carrinho/>
        }
      ])
  return (
    <UsuarioContext.Provider value={{nome, setNome, saldo, setSaldo}}>
        <RouterProvider router={router} />
    </UsuarioContext.Provider>
  )
}

export default Router