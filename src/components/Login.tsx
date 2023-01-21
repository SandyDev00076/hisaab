import styled from "@emotion/styled";
import { Container, Input, PrimaryButton } from "../style/shared";
import { Colors, Sizes } from "../style/variables";
import Field from "./Field";

const LoginContainer = styled(Container)`
  gap: 64px;
`;

const Greeting = styled.h1`
  font-size: ${Sizes.large};
  color: ${Colors.secondaryText};
  font-weight: normal;
  display: block;
`;

const Intro = styled.p`
  font-size: ${Sizes.large};
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

const LoginInput = styled(Input)`
    font-size: ${Sizes.large};
`

const LoginField = styled(Field)`
    display: block;
    margin-bottom: 16px;
`

function Login() {
  return (
    <LoginContainer>
      <Greeting>Hello</Greeting>
      <Intro>Track and calculate your monthly expenses</Intro>
      <LoginForm>
        <LoginField label="Email">
            <LoginInput type={"email"} />
        </LoginField>
        <LoginField label="Password">
            <LoginInput type={"password"} />
        </LoginField>
        <PrimaryButton>
            Login
        </PrimaryButton>
      </LoginForm>
    </LoginContainer>
  );
}

export default Login;
