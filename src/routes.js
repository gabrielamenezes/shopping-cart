import { UsuarioProvider } from "common/context/Usuario";
import { CarrinhoProvider } from "common/context/Carrinho";
import Carrinho from "pages/Carrinho";
import Feira from "pages/Feira";
import Login from "pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PagamentoProvider } from "common/context/Pagamento";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/feira",
      element: <Feira />,
    },
    {
      path: "/carrinho",
      element: <Carrinho />,
    },
  ]);
  return (
    <UsuarioProvider>
      <CarrinhoProvider>
        <PagamentoProvider>
          <RouterProvider router={router} />
        </PagamentoProvider>
      </CarrinhoProvider>
    </UsuarioProvider>
  );
};

export default Router;
