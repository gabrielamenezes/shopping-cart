import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import {UsuarioProvider } from 'common/context/Usuario'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

const Router = () => {
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
    <UsuarioProvider>
        <RouterProvider router={router} />
    </UsuarioProvider>
  )
}

export default Router