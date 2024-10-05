export const navigateToPurchaseForm = async () => {
  const buyBtn = await page.waitForSelector('[data-testid="buy-btn"]');

  await buyBtn?.click();

  return page.waitForSelector('[data-testid="purchase-beans-form-wrapper"]');
};

export const waitUntilBtnIsNotDisabled = async (btnSelector: string) =>
  page.waitForFunction(
    (selector) => {
      const button = document.querySelector(selector);
      return button && (button as HTMLButtonElement).disabled === false; // Check if the button is disabled
    },
    {},
    btnSelector
  );

export const typeInput = async (selector: string, value: string) => {
  await page.waitForSelector(selector);
  await page.click(selector);

  return page.type(selector, value);
};
