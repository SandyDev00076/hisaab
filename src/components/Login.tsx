import styled from "@emotion/styled";
import { Container } from "../style/shared";
import { Colors } from "../style/variables";

const LoginContainer = styled(Container)`
  gap: 64px;
`;

const Greeting = styled.h1`
  font-size: 24px;
  color: ${Colors.secondaryText};
  font-weight: normal;
  display: block;
`;

const Intro = styled.p`
  font-size: 24px;
  color: ${Colors.text};
  text-align: center;
`;

const Filler = styled.div`
  flex: 1;
`;

const LoginForm = styled.form`
  padding: 16px;
  width: 100%;
  background-color: ${Colors.bg};
  color: ${Colors.text};
  border-radius: 10px;
`;

function Login() {
  return (
    <LoginContainer>
      <Greeting>Hello</Greeting>
      <Intro>Track and calculate your monthly expenses</Intro>
      <LoginForm>Login Form will appear here</LoginForm>
    </LoginContainer>
  );
}

export default Login;
