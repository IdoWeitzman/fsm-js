import { navigateToPurchaseForm } from "./utils";

describe("Load Purchase Form", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000"); // Change to the URL you are testing
  });

  it("should load the purchase form", async () => {
    const formWrapper = await navigateToPurchaseForm();

    expect(await formWrapper?.isVisible()).toBeTruthy();
  });
});
