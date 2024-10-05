import { navigateToPurchaseForm } from "./utils";

describe("Fill partial form", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000"); // Change to the URL you are testing
  });

  it("next button should be disabled", async () => {
    await navigateToPurchaseForm();
    const selector = `[data-testid="form-field-name"]`;
    await page.waitForSelector(selector);
    await page.click(selector);
    await page.type(selector, "Foo");

    const buttonSelector = '[data-testid="fill-info-form-next-btn"]';

    const isDisabled = await page.$eval(
      buttonSelector,
      (button) => (button as HTMLButtonElement).disabled
    );

    expect(isDisabled).toBeTruthy();
  });
});
