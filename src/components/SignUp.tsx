import styled from "@emotion/styled";
import { FieldValues, useForm } from "react-hook-form";
import { Container, Form, Greeting, Input, PrimaryButton } from "../style/shared";
import { Colors, Sizes } from "../style/variables";
import Field from "./Field";

const SignUpContainer = styled(Container)`
    gap: 32px;
`;

const SignUpInput = styled(Input)`
    font-size: ${Sizes.medium};
`

const SignUpField = styled(Field)`
  display: block;
  margin-bottom: 16px;
`;

const Tip = styled.p`
    font-size: ${Sizes.xSmall};
    color: ${Colors.secondaryText};
    margin-bottom: 16px;
    text-align: center;
`

function SignUp() {
    const { register, handleSubmit } = useForm();

    function signItUp(data: FieldValues) {
        console.log(data);
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
                    <SignUpInput type={"text"} {...register("confirm-password")} />
                </SignUpField>
                <Tip>Password should be atleast 5 characters long</Tip>
                <PrimaryButton>
                    Sign Up
                </PrimaryButton>
            </Form>
        </SignUpContainer>
    )
}

export default SignUp;