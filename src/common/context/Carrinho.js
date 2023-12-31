import { createContext, useContext, useEffect, useState } from "react";
import { usePagamentoContext } from "./Pagamento";
import { UsuarioContext } from "./Usuario";
//cria o contexto
export const CarrinhoContext = createContext();
// muda o nome do contexto para a extensão do react no chrome
CarrinhoContext.displayName = 'Carrinho'

export const CarrinhoProvider = ({children}) => {
    //carrinho provider, vai prover valores para seus filhos    
    const [carrinho, setCarrinho] = useState([]);
    const [quantidadeDeProdutos, setQuantidadeDeProdutos] = useState(0);
    const [valorTotalCarrinho, setValorTotalCarrinho]= useState(0);
    return (
        <CarrinhoContext.Provider value={{carrinho, setCarrinho, quantidadeDeProdutos, setQuantidadeDeProdutos, valorTotalCarrinho, setValorTotalCarrinho}}>
            {children}
        </CarrinhoContext.Provider>
    )
}

//hook customizado
export const useCarrinhoContext = () => {
  //pega os valores do provider
    const {carrinho, setCarrinho, setQuantidadeDeProdutos, quantidadeDeProdutos, valorTotalCarrinho, setValorTotalCarrinho} = useContext(CarrinhoContext);
    const {formaPagamento} = usePagamentoContext();
    const {setSaldo} = useContext(UsuarioContext);

    function mudarQuantidade(id, quantidade) {
      //percorrer os itens do carrinho
      return carrinho.map(itemDoCarrinho => {
        //se o itemdocarrinho.id for igual ao id passado por parametro -> itemdocarrinho.quantidade vai diminuir ou aumentar
        if(itemDoCarrinho.id === id) itemDoCarrinho.quantidade += quantidade;
        //retorna o item do carrinho
        return itemDoCarrinho
      })
    }
    //função de adicionar triggada pelo botão "+" em Produto
    const adicionarProduto = (novoProduto) =>  {
      //percorre os itens do carrinho (array) tem itemCarrinho.id igual ao id do novo produto passado por parâmetro - retorna true or false
        const temOProduto = carrinho.some(itemDoCarrinho => itemDoCarrinho.id === novoProduto.id)
        //se não tem o produto
        if(!temOProduto) {
          novoProduto.quantidade = 1; // a quantidade é igual a 1
          //o novo carrinho será o carrinho anterior, com o novo produto adicionado
          return setCarrinho(carrinhoAnterior => 
            [...carrinhoAnterior, novoProduto])
        }
    
        //se tem o produto vai chamar a função mudarQuantidade passando o id do produto e o número 1
        // não tem que pegar o carrinho anterior porque só vai precisar alterar 1 produto
        setCarrinho(mudarQuantidade(novoProduto.id, 1))
      }

    //função de remover triggada pelo botão "-" em Produto
    const removerProduto = (id) => {
      //percorre o array do carrinho e retorna o primeiro elemento que satisfaz a condição. Ou seja, vai retornar o primeiro item no carrinho que tiver o id igual ao id passado por parâmetro
      const produto = carrinho.find(itemDoCarrinho => itemDoCarrinho.id === id)
      //se a quantidade do produto encontrado for igual a 1
      if(produto.quantidade === 1) {
        // vai retornar todos os itens do carrinho anterior em que o id do produto for diferente do id passado por parâmetro
        //ou seja, excluindo o produto do carrinho
        return setCarrinho(carrinhoAnterior => carrinhoAnterior.filter(itemDoCarrinho => itemDoCarrinho.id !== id))
      }
      //se a quantidade nao for um, vai chamar a função de mudarQuantidade e diminuir 
      setCarrinho(mudarQuantidade(id, -1))
    }

    const efetuarCompra = () => {
      setCarrinho([]);
      setSaldo(saldoAtual => saldoAtual - valorTotalCarrinho)

    }
    //sempre que o carrinho mudar, vamos precisar fazer um count de quantidade de produtos no carrinho
    useEffect(() => {
      const {novaQuantidade, novoTotal} = carrinho.reduce((quantidadeInicial, produto) => ({
        novaQuantidade: quantidadeInicial.novaQuantidade + produto.quantidade,
        novoTotal: quantidadeInicial.novoTotal + (produto.valor * produto.quantidade)
      
      }), {novaQuantidade: 0, novoTotal: 0} )
      setQuantidadeDeProdutos(novaQuantidade)
      setValorTotalCarrinho(novoTotal * formaPagamento.juros)
    }, [carrinho, setQuantidadeDeProdutos, setValorTotalCarrinho, formaPagamento])
    return {
        carrinho,
        setCarrinho,
        adicionarProduto,
        removerProduto,
        quantidadeDeProdutos,
        valorTotalCarrinho,
        setSaldo,
        efetuarCompra
    }
}