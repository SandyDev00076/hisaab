import styled from "@emotion/styled";
import {
  Container,
  Form,
  Greeting,
  Input,
  PrimaryButton,
  SecondaryButton,
} from "../style/shared";
import { Colors, Sizes } from "../style/variables";
import Field from "./Field";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled(Container)`
  gap: 32px;
`;

const Intro = styled.p`
  font-size: ${Sizes.large};
  color: ${Colors.text};
  text-align: center;
`;

const Filler = styled.div`
  flex: 1;
`;

const LoginForm = styled(Form)``;

const LoginInput = styled(Input)`
  font-size: ${Sizes.large};
`;

const LoginField = styled(Field)`
  display: block;
  margin-bottom: 16px;
`;

const ForgotPassword = styled.a`
  font-size: ${Sizes.small};
  display: block;
  text-align: center;
  margin-bottom: 16px;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  & > span {
    color: ${Colors.text};
    margin-bottom: 10px;
  }
`;

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  function onLogin(data: FieldValues) {
    console.log(data);
  }

  function goToSignUp() {
    navigate("signup");
  }

  return (
    <LoginContainer>
      <Greeting>Hello</Greeting>
      <Intro>Track and calculate your monthly expenses</Intro>
      <LoginForm onSubmit={handleSubmit(onLogin)}>
        <LoginField label="Email">
          <LoginInput type={"email"} {...register("email")} />
        </LoginField>
        <LoginField label="Password">
          <LoginInput type={"password"} {...register("password")} />
        </LoginField>
        <ForgotPassword href="/">Forgot password ?</ForgotPassword>
        <PrimaryButton>Login</PrimaryButton>
      </LoginForm>
      <Filler />
      <Footer>
        <span>Don't have an account ?</span>
        <SecondaryButton onClick={goToSignUp}>Sign Up</SecondaryButton>
      </Footer>
    </LoginContainer>
  );
}

export default Login;
