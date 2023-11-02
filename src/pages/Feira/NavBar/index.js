import { Nav } from './styles';
import { ReactComponent as Logo } from 'assets/logo.svg';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import { useCarrinhoContext } from 'common/context/Carrinho';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const {quantidadeDeProdutos} = useCarrinhoContext();
  const navigate = useNavigate();
  return (
    <Nav>
      <Logo />
      <IconButton disabled={quantidadeDeProdutos === 0} onClick={() => navigate('/carrinho')}>
        <Badge
          color="primary"
          badgeContent={quantidadeDeProdutos}
        >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Nav>
  )
}