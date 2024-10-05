describe("Load Gallery", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000"); // Change to the URL you are testing
  });

  it("should load the shop gallery", async () => {
    await page.waitForSelector('[data-testid="gallery"]');
    const numOfGalleryItems = await page.$eval(
      '[data-testid="gallery"]',
      (element) => {
        return element.children.length;
      }
    );

    expect(numOfGalleryItems).toBe(10);
  });
});
