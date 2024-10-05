import {
  navigateToPurchaseForm,
  typeInput,
  waitUntilBtnIsNotDisabled,
} from "./utils";

describe("Load Gallery", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000"); // Change to the URL you are testing
  });

  it("should fill the form successfully", async () => {
    await navigateToPurchaseForm();
    fillInfoFormFields();

    const buttonSelector = '[data-testid="fill-info-form-next-btn"]';

    await page.waitForFunction(
      (selector) => {
        const button = document.querySelector(selector);
        return button && (button as HTMLButtonElement).disabled === true; // Check if the button is disabled
      },
      {},
      buttonSelector // Pass the selector as an argument
    );

    const fillInfoFormNextBtnSelector =
      '[data-testid="fill-info-form-next-btn"]';
    await waitUntilBtnIsNotDisabled(fillInfoFormNextBtnSelector);
    await page.click(fillInfoFormNextBtnSelector);

    await page.waitForSelector('[data-testid="payment-form-wrapper"]');
    await fillPaymentFormFields();

    const paymentFormNextBtnSelector = '[data-testid="payment-form-pay-btn"]';
    await waitUntilBtnIsNotDisabled(paymentFormNextBtnSelector);
    await page.click(paymentFormNextBtnSelector);

    // since the pay success/failure logic is random, i wait for either one.
    const isVisible = await Promise.race(
      [fillInfoFormNextBtnSelector, paymentFormNextBtnSelector].map(
        (selector) => page.waitForSelector(selector, { visible: true })
      )
    )
      .then(() => true)
      .catch(() => false);

    expect(isVisible).toBeTruthy();
  });
});

const fillInfoFormFields = async () => {
  const fieldTestIds = ["form-field-name", "form-field-address"];

  for (const fieldTestId of fieldTestIds) {
    const selector = `[data-testid="${fieldTestId}"]`;

    await typeInput(selector, "Foo");
  }
};

const fillPaymentFormFields = async () => {
  const fieldTestIds = [
    "form-field-credit-card-number",
    "form-field-credit-card-exp",
    "form-field-credit-card-cvv",
  ];

  for (const fieldTestId of fieldTestIds) {
    const selector = `[data-testid="${fieldTestId}"]`;

    await typeInput(selector, "111");
  }
};
