import { FormTextInput } from "@/components/form-text-input";
import { FormField } from "./types";

interface FormFieldsProps {
  fields: FormField[];
}

export const FormFieldsRenderer = ({ fields }: FormFieldsProps) =>
  fields.map((formFieldData) => (
    <FormTextInput
      key={formFieldData.id}
      id={formFieldData.id}
      value={formFieldData.value}
      labelText={formFieldData.labelText}
      onChange={formFieldData.onChange}
      required
      error={formFieldData.error}
      type={formFieldData.type}
      dataTestId={formFieldData["data-testid"]}
    />
  ));
