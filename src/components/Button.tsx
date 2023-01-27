import { forwardRef } from "react";
import { useLoading } from "../data/loadingContext";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ children, ...props }, ref) => {
    const { state } = useLoading();
    return (
      <button {...props} ref={ref} disabled={state.loading || props.disabled}>
        {children}
      </button>
    );
  }
);

export default Button;
