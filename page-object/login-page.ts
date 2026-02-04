import { BasePage } from "./base-page";
import { Element } from "../core/element/element";
import { Account } from "../data-object/account";
import { expect } from "@playwright/test";

export class LoginPage {
  userNameTextbox: Element;
  passwordTextbox: Element;
  loginButton: Element;
  loginUsername: Element;
  logoutButton: Element;

  constructor() {
    this.userNameTextbox = new Element("//input[@id='userName']");
    this.passwordTextbox = new Element("//input[@id='password']");
    this.loginButton = new Element("//button[@id='login']");
    this.loginUsername = new Element("//label[@id='userName-value']");
    this.logoutButton = new Element("//button[.='Log out']");
  }

  async login(loginInfo: Account) {
    await this.userNameTextbox.type(loginInfo.userName);
    await this.passwordTextbox.type(loginInfo.password);
    await this.loginButton.click();
    await this.loginUsername.waitForElementToBeVisible();
    expect(await this.loginUsername.getText()).toBe(loginInfo.userName);
  }

  async logout() {
    await this.logoutButton.click();
  }
}
