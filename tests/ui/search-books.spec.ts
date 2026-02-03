import { test, expect } from "./hook";

test.describe("Search any Books", () => {
  test("List of search books results", async ({ basePage, bookPage }) => {
    await basePage.goToBookPage();

    const searchBooksName = ["Design", "design"];

    for (const booksName of searchBooksName) {
      await bookPage.searchBooks(booksName);
      await bookPage.verifyBookSearchResults(booksName);
    }
  });
});
