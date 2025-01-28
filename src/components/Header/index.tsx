import logo from "../../assets/logo-dio.png";
import { useNavigate } from "react-router-dom";
import { Button } from "../Button";
import { Link } from "react-router-dom";
import {useAuth} from "../../hooks/useauth"
import {
  Container,
  Wrapper,
  BuscarInputContainer,
  Input,
  Row,
  Menu,
  MenuRight,
  UserPicture,
} from "./styles";


const Header = () => {
  const { user, handleSignOut } = useAuth();
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <Wrapper>
      <Container>
        <Row>
          <Link to="/">
            <img src={logo} alt="Logo da dio" />
          </Link>
          {user.id ? (
            <>
              <BuscarInputContainer>
                <Input placeholder="Buscar..." />
              </BuscarInputContainer>
              <Menu>Live Code</Menu>
              <Menu>Global</Menu>
            </>
          ) : null}
        </Row>
        <Row>
          {user.id ? (
            <>
              <UserPicture src="https://avatars.githubusercontent.com/u/45184516?v=4" />
              <a href="#" onClick={handleSignOut}>Sair</a>
            </>
          ) : (
            <>
              <MenuRight href="/">Home</MenuRight>
              <Button title="Entrar" onClick={handleLoginClick} />
              <Button title="Cadastrar" onClick={handleRegisterClick} />
            </>
          )}
        </Row>
      </Container>
    </Wrapper>
  );
};

export { Header };
