import styled from "@emotion/styled";
import { Colors, Sizes } from "./variables";

export const Container = styled.section`
  padding: 64px 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
`;

export const Input = styled.input`
  padding: 8px 10px;
  width: 100%;
  background: none;
  border: 1px solid ${Colors.bgLight5};
  border-radius: 10px;
  outline: none;
  color: white;
`;

export const Button = styled.button`
  padding: 8px 10px;
  text-transform: uppercase;
  border: none;
  outline: none;
  width: 100%;
  border-radius: 10px;
  background: none;
  font-size: ${Sizes.medium};
  cursor: pointer;
`;

export const PrimaryButton = styled(Button)`
  background-color: ${Colors.action};
  color: ${Colors.text};
  &:hover {
    background-color: ${Colors.actionTint};
  }
`;
export const SecondaryButton = styled(Button)`
  border: 1px solid ${Colors.actionLight12};
  color: ${Colors.text};
  &:hover {
    border-color: ${Colors.actionLight11};
    color: ${Colors.secondaryText};
  }
`;
