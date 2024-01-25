import { t, ClientFunction } from 'testcafe';
import topNavbar from '../pages/components/topNavbar';
import RegisterPage from '../pages/registerPage';
import LoginPage from '../pages/loginPage';

export const toCamelCase = (inputString: string) =>
  inputString.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, chr) => chr.toUpperCase());

export const getPageUrl = () => ClientFunction(() => location.href)();

export const selectOption = async (t: TestController, dropdownSelector: Selector, optionName: string) => {
  await t.click(dropdownSelector).click(dropdownSelector.find('option').withExactText(optionName));
};

export const openPageUsingTopNavbar = async (pageName: string) => {
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  await topNavbar.clickTopNavbarLink(pageName);
  switch (pageName) {
    case 'Register':
      await t.expect(getPageUrl()).eql(registerPage.url());
      break;
    case 'Log in':
      await t.expect(getPageUrl()).eql(loginPage.url);
      break;
    default:
      throw new Error(`${pageName}Page is not deined or misstyped in the function body`);
  }
};
