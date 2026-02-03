import { Element, LocatorType } from "../core/element/element";
const { expect } = require("@playwright/test");

export class BookPage {
  searchBox: Element;
  searchResults: Element;
  bookStoreAPILabel: Element;

  constructor() {
    this.searchBox = new Element("//input[@id='searchBox']");
    this.searchResults = new Element("//div[@class='action-buttons']//a");
    this.bookStoreAPILabel = new Element("//span[text()='Book Store API']");
  }

  async searchBooks(booksName: string) {
    await this.searchBox.click();
    await this.searchBox.type(booksName);
  }

  async verifyBookSearchResults(booksName: string) {
    await this.searchResults.waitForElementToBeVisible();
    await this.bookStoreAPILabel.scrollIntoView();

    const books = await this.searchResults.getListCurrentLocators();

    const lowerSearchText = booksName.toLowerCase();

    for (const book of books) {
      const resultText = await book.textContent();
      const lowerResultText = resultText?.toLowerCase() ?? "";

      expect(lowerResultText).toContain(lowerSearchText);
    }
  }
}
