import styled from "@emotion/styled";
import { Colors, Sizes } from "../style/variables";

interface IProps {
  text: string;
}

const Container = styled.section`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
`;

const Line = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${Colors.bgLight5};
`;

const Text = styled.h3`
  color: ${Colors.bgLight5};
  font-size: ${Sizes.small};
  min-width: max-content;
`;

function Separator({ text }: IProps) {
  return (
    <Container>
      <Line />
      <Text>{text}</Text>
      <Line />
    </Container>
  );
}

export default Separator;
