import { createContext, useState } from "react";
export const CarrinhoContext = createContext();
CarrinhoContext.displayName = 'Carrinho'

export const CarrinhoProvider = ({children}) => {
    const [saldo, setSaldo] = useState(0)
    const [carrinho, setCarrinho] = useState([]);
    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    )
}