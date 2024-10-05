import { FormControl, InputLabel, OutlinedInput } from "@mui/material";
import { ChangeEventHandler, ComponentProps } from "react";

interface FormTextInputProps {
  id: string;
  labelText: string;
  required?: boolean;
  type?: ComponentProps<typeof OutlinedInput>["type"];
  error?: boolean;
  onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  value?: string | number;
}
export const FormTextInput = ({
  labelText,
  required,
  id,
  type,
  value,
  error,
  onChange,
}: FormTextInputProps) => {
  return (
    <FormControl error={error} required={required}>
      <InputLabel htmlFor="component-simple">{labelText}</InputLabel>
      <OutlinedInput
        onChange={onChange}
        id={id}
        label={labelText}
        type={type}
        value={value}
      />
    </FormControl>
  );
};
