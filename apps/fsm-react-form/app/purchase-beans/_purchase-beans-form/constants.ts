import { FormData } from "./types";

export const FILL_INFO_FORM_INITIAL_VALUES: FormData = {
  firstStep: {
    name: undefined,
    address: undefined,
  },
  secondStep: {
    creditCardNum: undefined,
    cvv: undefined,
    expiration: undefined,
  },
};
