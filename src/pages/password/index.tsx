import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock } from "react-icons/md";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { api } from "../../services/api"; 
import { useForm } from "react-hook-form";
import { Container, Title, Column, TitlePassF, SubtitlePassF, Wrapper } from "./styles";

const PasswordForgot = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm({
    reValidateMode: "onChange",
    mode: "onChange"
  });

 
  const onSubmit = async (formData) => {
    try {
      
      const response = await api.get(`http://localhost:8001/users?email=${formData.email}`);

      if (response.data.length > 0) {
        const userId = response.data[0].id;
        const updatedUser = { ...response.data[0], senha: formData.senha };

        
        const updateResponse = await api.put(`http://localhost:8001/users/${userId}`, updatedUser);

        
        alert("Senha atualizada com sucesso!");
        navigate("/login");
      } else {
        alert("Usuário não encontrado com esse e-mail.");
      }
    } catch (error) {
      console.error("Erro ao tentar atualizar a senha:", error);
      console.error("Resposta do erro:", error.response);
      alert("Houve um erro ao tentar atualizar a senha.");
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
            <TitlePassF>Esqueceu sua senha?</TitlePassF>
            <SubtitlePassF>Refefina a senha para que volte a acessar normalmente</SubtitlePassF>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Input placeholder="E-mail" leftIcon={<MdEmail />} name="email" control={control} />
              {errors.email && <span>E-mail é obrigatório</span>}
              <Input type="password" placeholder="Senha nova" leftIcon={<MdLock />} name="senha" control={control} />
              {errors.senha && <span>Senha é obrigatório</span>}
              <Button title="Cadastrar nova senha" variant="secondary" type="submit" />
            </form>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { PasswordForgot };
