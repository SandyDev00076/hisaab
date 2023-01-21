import styled from "@emotion/styled";
import { Sizes } from "../style/variables";

interface IProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    label: string;
    children: React.ReactNode;
}

const Label = styled.div`
    font-size: ${Sizes.small};
    margin: 0 0 5px 10px;
`

function Field({ label, children, ...props }: IProps) {
    return (
        <label {...props}>
            <Label>{label}</Label>
            {children}
        </label>
    )
}

export default Field;