import styled from "@emotion/styled";
import { FieldValues, useForm } from "react-hook-form";
import pb from "../lib/pocketbase";
import {
  Container,
  Form,
  Greeting,
  Input,
  PrimaryButton,
} from "../style/shared";
import { Colors, Sizes } from "../style/variables";
import Field from "./Field";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";

const SignUpContainer = styled(Container)`
  gap: 32px;
`;

const SignUpInput = styled(Input)`
  font-size: ${Sizes.medium};
`;

const SignUpField = styled(Field)`
  display: block;
  margin-bottom: 16px;
`;

const Tip = styled.p`
  font-size: ${Sizes.xSmall};
  color: ${Colors.secondaryText};
  margin-bottom: 16px;
  text-align: center;
`;

const Error = styled(Tip)`
  color: ${Colors.danger};
`;

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required(),
});

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [error, setError] = useState("");

  async function signItUp(data: FieldValues) {
    try {
      const userCreationData = await pb.collection("users").create(data);
      // store this data in redux/context
    } catch (e: any) {
      console.log("error", e.data);
      if (e.data && e.data.data && e.data.data.passwordConfirm) {
        setError("Passwords didn't match");
      } else {
        setError("Some error occurred");
      }
    }
  }

  return (
    <SignUpContainer>
      <Greeting>Join Us</Greeting>
      <Form onSubmit={handleSubmit(signItUp)}>
        <SignUpField label="Name">
          <SignUpInput type={"text"} {...register("name")} />
        </SignUpField>
        <SignUpField label="Email">
          <SignUpInput type={"email"} {...register("email")} />
        </SignUpField>
        <SignUpField label="Password">
          <SignUpInput type={"password"} {...register("password")} />
        </SignUpField>
        <SignUpField label="Confirm Password">
          <SignUpInput type={"text"} {...register("passwordConfirm")} />
        </SignUpField>
        {error ? (
          <Error>{error}</Error>
        ) : (
          <Tip>Password should be atleast 5 characters long</Tip>
        )}
        <PrimaryButton disabled={!isValid}>Sign Up</PrimaryButton>
      </Form>
    </SignUpContainer>
  );
}

export default SignUp;
