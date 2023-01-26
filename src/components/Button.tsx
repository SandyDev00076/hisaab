import { forwardRef } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, IProps>(
  ({ children, loading = false, ...props }, ref) => {
    return (
      <button {...props} ref={ref}>
        {loading ? "Loading" : children}
      </button>
    );
  }
);

export default Button;
