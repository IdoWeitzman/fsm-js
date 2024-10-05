import { Step, StepLabel, Stepper } from "@mui/material";

const steps = ["Fill Your Info", "Payment Details", "Payment Result"] as const;

interface FormStepperProps {
  activeStep: 0 | 1 | 2;
}

export const FormStepper = ({ activeStep }: FormStepperProps) => {
  return (
    <Stepper activeStep={activeStep}>
      {steps.map((label) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};

        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
