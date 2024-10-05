import { FormData, UpdateFormFn } from "../types";
import { FormField } from "../types";
import { FormFieldsRenderer } from "../form-fields-renderer";

interface FillInfoFormFieldsProps {
  updateForm: UpdateFormFn<"firstStep">;
  formData: FormData["firstStep"];
}

export const FillInfoFormFields = ({
  updateForm,
  formData,
}: FillInfoFormFieldsProps) => {
  const FORM_FIELDS: FormField[] = [
    {
      id: "name",
      labelText: "Name",
      value: formData.name,
      onChange: (e) => updateForm("name", e.target.value),
      error: formData.name === "",
      "data-testid": "form-field-name",
    },
    {
      id: "address",
      labelText: "Address",
      value: formData.address,
      onChange: (e) => updateForm("address", e.target.value),
      error: formData.address === "",
      "data-testid": "form-field-address",
    },
  ];

  return <FormFieldsRenderer fields={FORM_FIELDS} />;
};
