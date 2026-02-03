import { BookService } from "../../service/book-service";
import { LoginService } from "../../service/login-service";
import {
  testMain as test,
  requestMain as request,
  expectMain as expect,
} from "../../fixtures/main-fixture";

test.describe("Add Book", () => {
  test("Add Book Name Learning JavaScript Design Patterns", async ({
    bookService,
    loginService,
  }) => {
    const userId = await loginService.getUserId();
    const token = await loginService.getAccessToken();
    const response = await bookService.addBooks(userId, token);
    console.log(response);
  });
});
