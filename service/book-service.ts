import { API_DEMO_QA_BOOKS_ENDPOINTS } from "../constant/endpoints";
import { APIClient } from "../core/api/api-client";
import { LOGIN_DATA } from "../test-data/login-data";
import { BOOK_DATA } from "../test-data/book-data";
import { LoginService } from "../service/login-service";

export class BookService {
  _client: APIClient;

  constructor(apiClient: APIClient) {
    this._client = apiClient;
  }

  async addBooks(isbn: string) {
    const loginService = new LoginService(this._client);
    const token = await loginService.getAccessToken();
    const account = LOGIN_DATA["test_account_01"];

    return await this._client.post(API_DEMO_QA_BOOKS_ENDPOINTS.ADD_BOOKS, {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      data: {
        userId: account.userId,
        collectionOfIsbns: [
          {
            isbn: isbn,
          },
        ],
      },
    });
  }
}
