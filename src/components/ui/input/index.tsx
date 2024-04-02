import { ComponentPropsWithoutRef, PropsWithoutRef, forwardRef } from "react";
import { ErrorMessage } from "../typography/errorMessage";
import { Container, InputField } from "./styles";

type InputProps = {
  label: string;
  hasErrorMessage?: string;
  type?: string;
} & ComponentPropsWithoutRef<"input">;

export function InputStyled(
  { label, hasErrorMessage, type = "text", ...props }: InputProps,
  ref: React.ForwardedRef<HTMLInputElement>
) {
  return (
    <Container>
      <label htmlFor={label}>{label}</label>
      <InputField
        ref={ref}
        aria-label={label}
        type={type}
        defaultValue={props.defaultValue}
        {...props}
      />
      <ErrorMessage text={hasErrorMessage} />
    </Container>
  );
}

export const Input = forwardRef(InputStyled);
