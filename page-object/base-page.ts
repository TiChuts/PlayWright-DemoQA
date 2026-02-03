import { BrowserManagement } from "../core/browser/browser-management";
import { Element, LocatorType } from "../core/element/element";
import { Page } from "@playwright/test";
import { LoginPage } from "./login-page";
import { ProfilePage } from "./profile-page";
import { WEB_DEMO_QA_ENDPOINTS } from "../constant/endpoints";
import { BookPage } from "./book-page";

export class BasePage {
  page(): Page {
    return BrowserManagement.page;
  }

  async goToLoginPage(): Promise<LoginPage> {
    await this.page().goto(WEB_DEMO_QA_ENDPOINTS.LOGIN);
    return new LoginPage();
  }

  async goToBookPage(): Promise<BookPage> {
    await this.page().goto(WEB_DEMO_QA_ENDPOINTS.BOOK);
    return new BookPage();
  }
}
