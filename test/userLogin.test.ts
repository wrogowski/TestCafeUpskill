import HomePage from '../pages/homePage';
import LoginPage from "../pages/loginPage";
import RegisterPage from "../pages/registerPage";
import topNavbar from "../pages/components/topNavbar";
import { getPageUrl } from '../page_methods/commonMethods';
import { createValidUserByApi } from "../helpers/apiRequests";
import { primaryUser, secondaryUser, userUtils } from '../helpers/users';

const homePage = new HomePage();
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
let validCredentials: { login: string, password: string };

fixture("Login page tests")
  .page(registerPage.url);

test.before(async t => {
  const token: string = await registerPage.verificationToken.getAttribute('value') || '';
  validCredentials = await createValidUserByApi(token)
})("Impossible to login with incorrect credentials", async (t) => {
  await t.navigateTo(loginPage.url);
  loginPage.loginWithCredentials('test@email.email.email', 'test');

  await t.expect(loginPage.loginFormErrorMessage.innerText)
    .eql('Login was unsuccessful. Please correct the errors and try again.\nNo customer account found')

  loginPage.loginWithCredentials(validCredentials.login, ' ');

  await t.expect(loginPage.loginFormErrorMessage.innerText)
    .eql('Login was unsuccessful. Please correct the errors and try again.\nNo customer account found')
    .expect(getPageUrl()).eql(loginPage.url);
});

test("Create user, navigate to login page and login", async (t) => {
  const primaryUserCredentials = await registerPage.createUser(primaryUser);
  const secondaryUserCredentials = await registerPage.createUser(secondaryUser);

  topNavbar.clickTopNavbarLink('Log in');
  loginPage.loginWithCredentials(primaryUserCredentials.login, primaryUserCredentials.password);

  await t.expect(getPageUrl()).eql(homePage.url)
    .navigateTo(loginPage.url)
    .expect(loginPage.notificationBar(await userUtils.getFullName(primaryUser)).exists).ok();

  loginPage.loginWithCredentials(secondaryUserCredentials.login, secondaryUserCredentials.password);
  await t.expect(getPageUrl()).eql(homePage.url)
    .navigateTo(loginPage.url)
    .expect(loginPage.notificationBar(await userUtils.getFullName(secondaryUser)).exists).ok();

});
