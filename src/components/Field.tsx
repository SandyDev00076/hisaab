import styled from "@emotion/styled";
import { Colors, Sizes } from "../style/variables";

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  children: React.ReactNode;
  optional?: boolean;
}

const Label = styled.div`
  font-size: ${Sizes.small};
  margin: 0 10px 5px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Optional = styled.span`
  color: ${Colors.secondaryText};
`;

function Field({ label, optional = false, children, ...props }: IProps) {
  return (
    <label {...props}>
      <Label>
        {label}
        {optional && <Optional>optional</Optional>}
      </Label>
      {children}
    </label>
  );
}

export default Field;
