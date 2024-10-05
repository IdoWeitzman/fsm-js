import { OutlinedButton } from "@/components/outlined-button";
import { Box, FormGroup } from "@mui/material";
import { FillInfoFormFields } from "./fill-info-form-fields";
import { FormData, UpdateFormFn } from "../types";

export interface FillInfoFormProps {
  onNextClick: () => void;
  onFieldChange: UpdateFormFn<"firstStep">;
  formData: FormData["firstStep"];
}

export const FillInfoForm = ({
  onNextClick,
  onFieldChange,
  formData,
}: FillInfoFormProps) => (
  <Box>
    <FormGroup
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 1,
      }}
    >
      <FillInfoFormFields formData={formData} updateForm={onFieldChange} />
    </FormGroup>
    <Box display="flex" gap={1} marginTop={2}>
      <OutlinedButton
        data-testid="fill-info-form-next-btn"
        disabled={Object.values(formData).some((val) => !val)}
        onClick={onNextClick}
      >
        Next
      </OutlinedButton>
    </Box>
  </Box>
);
