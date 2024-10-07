import "expect-puppeteer";
import { toMatchImageSnapshot } from "jest-image-snapshot";

expect.extend({ toMatchImageSnapshot });

describe("Purchase form - visual", () => {
  ["light", "dark"].forEach((colorMode) => {
    it(`should render the correct ui for ${colorMode} mode`, async () => {
      await page.emulateMediaFeatures([
        { name: "prefers-color-scheme", value: colorMode },
      ]);

      await page.goto("http://localhost:3000/purchase-beans");

      expect(await page.screenshot()).toMatchImageSnapshot();
    });
  });
});
