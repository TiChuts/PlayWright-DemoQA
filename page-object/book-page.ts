import { Element, LocatorType } from "../core/element/element";
import { BrowserManagement } from "../core/browser/browser-management";
const { expect } = require("@playwright/test");

export class BookPage {
  searchBox: Element;
  searchResults: Element;
  bookStoreAPILabel: Element;
  confirmDeleteBookButton: Element;
  blankSearchResult: Element;

  constructor() {
    this.searchBox = new Element("//input[@id='searchBox']");
    this.searchResults = new Element("//div[@class='action-buttons']//a");
    this.bookStoreAPILabel = new Element("//span[text()='Book Store API']");
    this.confirmDeleteBookButton = new Element(
      "//button[@id='closeSmallModal-ok']",
    );
    this.blankSearchResult = new Element("//div[.='No rows found']");
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

  async getDeleteBookIconByBookTitle(bookName: string) {
    let deleteBookIcon = new Element(
      `//div[@class='rt-td'][.//a[normalize-space(.)='${bookName}']]
      /following-sibling::div//span[contains(@id,'delete-record')]`,
    );
    return new Element(deleteBookIcon);
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
}
