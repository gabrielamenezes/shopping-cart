import { Button, Snackbar, InputLabel, Select, MenuItem } from '@mui/material';
import MuiAlert from '@mui/lab/Alert';
import { useContext, useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { UsuarioContext } from 'common/context/Usuario';
import Produto from 'components/Produto';
import { useNavigate } from 'react-router-dom';
import { usePagamentoContext } from 'common/context/Pagamento';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {carrinho, valorTotalCarrinho} = useCarrinhoContext();
  const {saldo} = useContext(UsuarioContext)
  const {formaPagamento, tiposPagamento, mudarFormaPagamento} = usePagamentoContext();
  const total = saldo - valorTotalCarrinho;

  return (
    <Container>
      <Voltar/>
      <h2>
        Carrinho
      </h2>
      {carrinho.map(produto => (
        <Produto {...produto} key={produto.id}/>
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
        <Select onChange={(e) => mudarFormaPagamento(e.target.value)} value={formaPagamento.id}>
          {tiposPagamento.map(pagamento => (<MenuItem key={pagamento.id} value={pagamento.id}>{pagamento.nome}</MenuItem>))}
        </Select>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {valorTotalCarrinho.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {saldo.toFixed(2)}</span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ {total.toFixed(2)}</span>
          </div>
        </TotalContainer>
      <Button
        onClick={() => {
          setOpenSnackbar(true);
        }}
        color="primary"
        variant="contained"
      >
         Comprar
       </Button>
        <Snackbar
          anchorOrigin={
            { 
              vertical: 'top',
              horizontal: 'right'
            }
          }
          open={openSnackbar}
          onClose={() => setOpenSnackbar(false)}
        >
           <MuiAlert
            onClose={() => setOpenSnackbar(false)}
            severity="success"
          >
            Compra feita com sucesso!
          </MuiAlert>
        </Snackbar>
    </Container>
  )
}

export default Carrinho;