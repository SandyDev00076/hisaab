import styled from "@emotion/styled";
import { Colors } from "../style/variables";

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
`;

const ProgressBar = styled.div`
  height: 8px;
  border-radius: 8px;
  background-color: ${Colors.bgLight25};
  opacity: 0.8;
  animation: loading 1s infinite linear;
  transform-origin: 0% 50%;
`

const Loading = () => {
  return (
    <Container>
      <ProgressBar />
    </Container>
  )
}

export default Loading;