import styled from "@emotion/styled";
import { Container, Form, Greeting } from "../style/shared";

const SignUpContainer = styled(Container)`
    gap: 32px;
`

function SignUp() {
    return (
        <SignUpContainer>
            <Greeting>Join Us</Greeting>
            <Form>

            </Form>
        </SignUpContainer>
    )
}

export default SignUp;