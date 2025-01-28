import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api";
import { Link } from "react-router-dom";

import { useForm } from "react-hook-form";
import { IFormData } from "./types"; // Importe o tipo corretamente

import {
  Container,
  Title,
  Column,
  TitleRegister,
  SubtitleRegister,
  LoginText,
  CriarText,
  Row,
  Wrapper,
  TenhoContaText
} from "./styles";

const Register = () => {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<IFormData>({
    // Tipando o useForm com IFormData
    reValidateMode: "onChange",
    mode: "onChange"
  });

  const onSubmit = async (formData: IFormData) => {
    // Tipando o onSubmit com IFormData
    try {
      const response = await api.post("/users", formData);

      console.log("Dados enviados com sucesso:", response.data);

      navigate("/login");
    } catch (e) {
      alert("Erro ao registrar usuário");
    }
  };

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
            <TitleRegister>Comece agora grátis</TitleRegister>
            <SubtitleRegister>Crie seu login e make the change._</SubtitleRegister>

            <form onSubmit={handleSubmit(onSubmit)}>
              {" "}
              {/* A função handleSubmit já espera que o tipo seja passado */}
              <Input placeholder="Nome Completo" leftIcon={<MdPerson />} name="name" control={control} />
              {errors.name && <span>Nome é obrigatório</span>}
              <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input type="password" placeholder="Senha" leftIcon={<MdLock />} name="senha" control={control} />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button title="Cadastrar" variant="secondary" type="submit" />
            </form>

            <SubtitleRegister style={{ marginTop: "20px" }}>
              Ao clicar em "criar minha conta grátis", declaro que aceito as Políticas de Privacidade e os Termos de Uso
              da DIO.{" "}
            </SubtitleRegister>
            <TenhoContaText>
              Já tenho conta.
              <Link to="/login">
                <LoginText>Fazer login.</LoginText>
              </Link>
            </TenhoContaText>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { Register };
