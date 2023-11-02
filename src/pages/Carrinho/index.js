import { Button, Snackbar, InputLabel } from '@mui/material';
import MuiAlert from '@mui/lab/Alert';
import { useContext, useState } from 'react';
import { Container, Voltar, TotalContainer, PagamentoContainer} from './styles';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { UsuarioContext } from 'common/context/Usuario';
import Produto from 'components/Produto';
import { useNavigate } from 'react-router-dom';

function Carrinho() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const {carrinho} = useCarrinhoContext();
  const {saldo} = useContext(UsuarioContext)
  const navigate = useNavigate();
  return (
    <Container>
      <Voltar onClick={navigate('/feira')}/>
      <h2>
        Carrinho
      </h2>
      {carrinho.map(produto => (
        <Produto {...produto} key={produto.id}/>
      ))}
      <PagamentoContainer>
        <InputLabel> Forma de Pagamento </InputLabel>
      </PagamentoContainer>
      <TotalContainer>
          <div>
            <h2>Total no Carrinho: </h2>
            <span>R$ {carrinho.reduce((cont, item) => cont + (item.valor * item.quantidade), 0)}</span>
          </div>
          <div>
            <h2> Saldo: </h2>
            <span> R$ {saldo}</span>
          </div>
          <div>
            <h2> Saldo Total: </h2>
            <span> R$ </span>
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