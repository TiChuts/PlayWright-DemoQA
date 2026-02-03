import { BasePage } from "./base-page";
import { Element } from "../core/element/element"
import { Account } from "../data-object/account"

export class LoginPage{
    userNameTextbox: Element;
    passwordTextbox: Element;
    loginButton: Element;

    constructor(){
        this.userNameTextbox = new Element("//input[@id='userName']");
        this.passwordTextbox = new Element("//input[@id='password']");
        this.loginButton = new Element("//button[@id='login']");
    }          

    async login(loginInfo: Account) {
        await this.userNameTextbox.type(loginInfo.userName);
        await this.passwordTextbox.type(loginInfo.password);
        await this.loginButton.click();
    }
}
