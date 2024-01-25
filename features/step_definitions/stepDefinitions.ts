import RegisterPage from '../../pages/registerPage';
import { Given, When } from '@cucumber/cucumber';
import { t } from 'testcafe';

const registerPage = new RegisterPage();

Given('I open the regstration page', async (t: TestController) => await t.navigateTo(registerPage.url()));

When('I select the {string} option from Gender radio buttons', async (t, optionName) => {
  await registerPage.setGender(optionName);
});

When(/^I provide the "(.+)" field with "(.+)" value$/, async (t, [inputName, value]: string[]) => {
  try {
    await registerPage[`set${inputName}`](value);
  } catch (error) {
    throw new Error(`registerPage.set${inputName} method does not exist`);
  }
});
