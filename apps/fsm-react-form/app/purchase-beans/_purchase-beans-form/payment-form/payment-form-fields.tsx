import { FormData, UpdateFormFn } from "../types";
import { FormField } from "../types";
import { FormFieldsRenderer } from "../form-fields-renderer";

interface PaymentFormFieldsProps {
  updateForm: UpdateFormFn<"secondStep">;
  formData: FormData["secondStep"];
}

export const PaymentFormFields = ({
  updateForm,
  formData,
}: PaymentFormFieldsProps) => {
  const FORM_FIELDS: FormField[] = [
    {
      id: "cc-num",
      labelText: "Credit Card Number",
      value: formData.creditCardNum,
      onChange: (e) => updateForm("creditCardNum", e.target.value),
      error: formData.creditCardNum === "",
    },
    {
      id: "cc-exp",
      labelText: "Expiration Date",
      value: formData.expiration,
      onChange: (e) => updateForm("expiration", e.target.value),
      error: formData.expiration === "",
    },
    {
      id: "cc-cvv",
      labelText: "CVV",
      value: formData.cvv,
      type: "number",
      onChange: (e) => updateForm("cvv", e.target.value),
      error: formData.cvv === 0,
    },
  ];

  return <FormFieldsRenderer fields={FORM_FIELDS} />;
};
