import styled from "@emotion/styled";
import { Colors } from "../style/variables";

const Loader = styled.span`
  display: inline-block;
  width: 20px;
  height: 20px;
  position: relative;
  border: 4px solid ${Colors.bgLight5};
  top: 50%;
  animation: loader 2s infinite ease;
  margin: 2px;
`;

const InnerLoader = styled.span`
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: ${Colors.bgLight5};
  animation: loader-inner 2s infinite ease-in;
`;

function Loading() {
  return (
    <Loader>
      <InnerLoader />
    </Loader>
  );
}

export default Loading;
