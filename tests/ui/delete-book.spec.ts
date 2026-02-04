import { log } from "node:console";
import { test, expect } from "./hook";
import { LOGIN_DATA } from "../../test-data/login-data";

test.describe("Delete Books", () => {
  test("Delete book after search", async ({
    basePage,
    loginPage,
    bookPage,
  }) => {
    const user = LOGIN_DATA.test_account_01;
    await basePage.goToLoginPage();
    await loginPage.login(user);

    const searchBooksName = "Learning JavaScript Design Patterns";
    await bookPage.searchBooks(searchBooksName);
    await bookPage.verifyBookSearchResults(searchBooksName);

    (await bookPage.getDeleteBookIconByBookTitle(searchBooksName)).click();
    await bookPage.confirmDeleteBook();

    await bookPage.searchBooks(searchBooksName);

    await loginPage.logout();
  });
});
