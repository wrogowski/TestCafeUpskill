import { Selector, t } from "testcafe";

class LoginPage {
  url = 'https://demo.nopcommerce.com/login';

  emailInput = Selector('input#Email');
  passwordInput = Selector('input#Password');
  rememberMeCheckbox = Selector('input#RememberMe');
  forgotPasswordLink = Selector('a[href="/passwordrecovery"]');
  loginButton = Selector('button.login-button');
  registerButton = Selector('button.register-button');
  loginFormErrorMessage = Selector('form div.message-error');
  notificationBar = (userFullName: string) => Selector('div.success p.content')
  .withText(`You are already logged in as ${userFullName}. You may log in with another account.`);

  loginWithCredentials = async (login: string, password: string) =>
    await t
      .typeText(this.emailInput, login, { paste: true, replace: true })
      .typeText(this.passwordInput, password, { paste: true, replace: true })
      .click(this.loginButton);
}

export default LoginPage;
