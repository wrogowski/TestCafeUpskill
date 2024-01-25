import RegisterPage from '../../pages/registerPage';
import RegisterResultPage from '../../pages/registerResultPage';
import { getPageUrl } from '../../page_methods/commonMethods';
import { Given, When, Then } from '@cucumber/cucumber';
import { t } from 'testcafe';

const registerPage = new RegisterPage();
const registerResultPage = new RegisterResultPage();

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

When(/^I set Date of Birth to "(.+)" "(.+)" "(.+)"$/, async (t, [day, month, year]) => {
  await registerPage.setDateOfBirth({ day, month, year });
});

When(/^I click the "Register" button$/, async () => {
  await registerPage.clickRegisterButton();
});

Then('registration confirmation page is opened', async () => await t.expect(getPageUrl()).eql(registerResultPage.url));

Then('a sucess message is displayed', async () => {
  const messageText = await registerResultPage.resultMessage.innerText;

  await t.expect(messageText).eql('Your registration completed');
});
