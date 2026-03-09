import { log } from "node:console";
import { test, expect } from "./hook";
import { LOGIN_DATA } from "../../test-data/login-data";
import { BOOK_DATA } from "../../test-data/book-data";

test.describe("Delete Books", () => {
  test("Delete book after search", async ({
    basePage,
    loginPage,
    profilePage,
    bookService,
  }) => {
    //Precondition: Add book via API
    const book = BOOK_DATA["valid_book_1"];
    const response = await bookService.addBooks(book.isbn);
    console.log(response);

    //Running test
    const user = LOGIN_DATA.test_account_01;
    await basePage.goToLoginPage();
    await loginPage.login(user);

    const searchBooksName = "Learning JavaScript Design Patterns";
    await profilePage.searchBooks(searchBooksName);
    await profilePage.verifyBookSearchResults(searchBooksName);

    const deleteIcon =
      await profilePage.getDeleteBookIconByBookTitle(searchBooksName);
    await deleteIcon.click();
    await profilePage.confirmDeleteBook();

    await profilePage.searchBooks(searchBooksName);
    await profilePage.verifyBookSearchBlankResults(searchBooksName);
  });
});
