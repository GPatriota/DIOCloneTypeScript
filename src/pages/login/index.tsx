
import { MdEmail, MdLock } from "react-icons/md";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useauth";

import {
  Container,
  Title,
  Column,
  TitleLogin,
  SubtitleLogin,
  EsqueciText,
  CriarText,
  Row,
  Wrapper,
} from "./styles";
import { IFormData } from "./types";

const Login = () => {
  const {handleLogin} = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit = async (formData:IFormData) => {
    handleLogin(formData);
  };

  console.log("errors", errors);

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais tecnologias e entrar mais rápido nas
            empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Faça seu login</TitleLogin>
            <SubtitleLogin>Faça seu login e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="password" control={control} />
              {errors.password && <span>Senha é obrigatório</span>}
              <Button title="Entrar" variant="secondary" type="submit" />
            </form>
            <Row>
              <Link to="/PasswordForgot">
                <EsqueciText>Esqueci minha senha</EsqueciText>
              </Link>

              <Link to="/register">
                <CriarText>Criar Conta</CriarText>
              </Link>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Login };
