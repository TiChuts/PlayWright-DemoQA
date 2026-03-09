import { Element, LocatorType } from "../core/element/element";
import { BrowserManagement } from "../core/browser/browser-management";
const { expect } = require("@playwright/test");

export class ProfilePage {
  searchBox: Element;
  searchResults: Element;
  bookStoreLabel: Element;
  confirmDeleteBookButton: Element;

  constructor() {
    this.searchBox = new Element("//input[@id='searchBox']");
    this.searchResults = new Element("//div[@class='action-buttons']//a");
    this.bookStoreLabel = new Element("//span[text()='Book Store']");
    this.confirmDeleteBookButton = new Element(
      "//button[@id='closeSmallModal-ok']",
    );
  }

  async searchBooks(booksName: string) {
    await this.searchBox.click();
    await this.searchBox.type(booksName);
  }

  async verifyBookSearchResults(booksName: string) {
    await this.searchResults.waitForElementToBeVisible();
    // await this.bookStoreAPILabel.scrollIntoView();

    const books = await this.searchResults.getListCurrentLocators();

    const lowerSearchText = booksName.toLowerCase();

    for (const book of books) {
      const resultText = await book.textContent();
      const lowerResultText = resultText?.toLowerCase() ?? "";

      expect(lowerResultText).toContain(lowerSearchText);
    }
  }

  async getDeleteBookIconByBookTitle(bookName: string) {
    return new Element(
      `//a[normalize-space()="${bookName}"]/ancestor::td/following-sibling::td[3]/div//span[contains(@id,'delete-record')]`,
    );
  }

  async confirmDeleteBook() {
    const page = BrowserManagement.page;

    const [dialog] = await Promise.all([
      page.waitForEvent("dialog"),
      this.confirmDeleteBookButton.click(),
    ]);

    console.log("Dialog message:", dialog.message());

    expect(dialog.message()).toBe("Book deleted.");

    await dialog.accept();
  }

  async verifyBookSearchBlankResults(booksName: string) {
    const blankSearchResult = new Element(
      `//div[@class='action-buttons']//a[text()='${booksName}']`,
    );

    await this.bookStoreLabel.scrollIntoView();

    const count = await blankSearchResult.getCurrentLocator().count();
    expect(count).toBe(0);
  }
}
