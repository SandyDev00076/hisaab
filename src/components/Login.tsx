import styled from "@emotion/styled";
import {
  Container,
  Filler,
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
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import pb from "../lib/pocketbase";
import { useLoading } from "../data/loadingContext";

const LoginContainer = styled(Container)`
  gap: 32px;
`;

const Intro = styled.p`
  font-size: ${Sizes.large};
  color: ${Colors.text};
  text-align: center;
`;

const LoginInput = styled(Input)`
  font-size: ${Sizes.large};
`;

const LoginField = styled(Field)`
  display: block;
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

const LoginButton = styled(PrimaryButton)`
  margin-top: 32px;
`;

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

function Login() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  async function onLogin(data: FieldValues) {
    showLoading();
    await pb.collection("users").authWithPassword(data.email, data.password);
    hideLoading();
    navigate(0);
  }

  function goToSignUp() {
    navigate("signup");
  }

  return (
    <LoginContainer>
      <Greeting>Hello</Greeting>
      <Intro>Track and calculate your monthly expenses</Intro>
      <Form onSubmit={handleSubmit(onLogin)}>
        <LoginField label="Email">
          <LoginInput type={"email"} {...register("email")} />
        </LoginField>
        <LoginField label="Password">
          <LoginInput type={"password"} {...register("password")} />
        </LoginField>
        <LoginButton disabled={!isValid}>Login</LoginButton>
      </Form>
      <Filler />
      <Footer>
        <span>Don't have an account ?</span>
        <SecondaryButton onClick={goToSignUp}>Sign Up</SecondaryButton>
      </Footer>
    </LoginContainer>
  );
}

export default Login;
