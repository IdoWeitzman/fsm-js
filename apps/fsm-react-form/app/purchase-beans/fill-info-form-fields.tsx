import { FormTextInput } from "@/components/form-text-input";
import { ChangeEventHandler } from "react";
import { FormData, UpdateFormFn } from "./fill-info-form";

interface FillInfoFormFieldsProps {
  updateForm: UpdateFormFn;
  formData: FormData;
}

interface FormField {
  id: string;
  labelText: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  error: boolean;
}

export const FillInfoFormFields = ({
  updateForm,
  formData,
}: FillInfoFormFieldsProps) => {
  const FORM_FIELDS: FormField[] = [
    {
      id: "name",
      labelText: "Name",
      onChange: (e) => updateForm("name", e.target.value),
      error: formData.name === "",
    },
    {
      id: "address",
      labelText: "Address",
      onChange: (e) => updateForm("address", e.target.value),
      error: formData.address === "",
    },
    {
      id: "cc-num",
      labelText: "Credit Card Number",
      onChange: (e) => updateForm("creditCardNum", e.target.value),
      error: formData.creditCardNum === "",
    },
    {
      id: "cc-exp",
      labelText: "Expiration Date",
      onChange: (e) => updateForm("expiration", e.target.value),
      error: formData.expiration === "",
    },
    {
      id: "cc-cvv",
      labelText: "CVV",
      onChange: (e) => updateForm("cvv", e.target.value),
      error: formData.cvv === 0,
    },
  ];

  return FORM_FIELDS.map((formFieldData) => (
    <FormTextInput
      key={formFieldData.id}
      id={formFieldData.id}
      labelText={formFieldData.labelText}
      onChange={formFieldData.onChange}
      required
      error={formFieldData.error}
    />
  ));
};
