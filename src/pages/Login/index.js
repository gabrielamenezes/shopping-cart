import {
  Container,
  Titulo,
  InputContainer
} from './styles';
import { Button, Input, InputLabel, InputAdornment } from '@mui/material'
import {useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { UsuarioContext } from 'common/context/Usuario';
function Login() {
  const navigate = useNavigate();
  const usuario = useContext(UsuarioContext);
  return (
    <Container>
      <Titulo>
        Insira o seu nome
      </Titulo>
      <InputContainer>
        <InputLabel>
          Nome
        </InputLabel>
        <Input
          type="text"
          value={usuario.nome}
          onChange={(e) => usuario.setNome(e.target.value)}
        />
      </InputContainer>
      <InputContainer>
        <InputLabel>
          Saldo
        </InputLabel>
        <Input
        type="number"
        value={usuario.saldo}
        onChange={(e) => usuario.setSaldo(e.target.value)}
        startAdornment={
          <InputAdornment position="start">
            R$
          </InputAdornment>
        }
      />
      </InputContainer>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/feira')}
      >
        Avançar
      </Button>
    </Container>
  )
};

export default Login;