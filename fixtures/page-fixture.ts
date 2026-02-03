import { test } from "@playwright/test";
import { LoginPage } from "../page-object/login-page";
import { BasePage } from "../page-object/base-page";
import { BookPage } from "../page-object/book-page";

export type PageFixtureType = {
  loginPage: LoginPage;
  basePage: BasePage;
  bookPage: BookPage;
};

type ExtendParams = Parameters<typeof test.extend<PageFixtureType>>;

export const pageFixture: ExtendParams[0] = {
  basePage: async ({}, use) => {
    await use(new BasePage());
  },
  loginPage: async ({}, use) => {
    await use(new LoginPage());
  },
  bookPage: async ({}, use) => {
    await use(new BookPage());
  },
};
