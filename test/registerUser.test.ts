import HomePage from '../pages/homePage';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';
import RegisterResultPage from '../pages/registerResultPage';
import { openPageUsingTopNavbar, getPageUrl } from '../page_methods/commonMethods';
import { RequestLogger, test } from 'testcafe';
import { primaryUser } from '../helpers/users';

const homePage = new HomePage();
const loginPage = new LoginPage();
const registerPage = new RegisterPage();
const restultPage = new RegisterResultPage();
const logger = RequestLogger();

fixture('User registartion form tests')
  .page(registerPage.url)
  .beforeEach(async t => await t.maximizeWindow());

test.page(homePage.url).requestHooks(logger)('Open user registartion page using top naviation bar', async t => {
  await openPageUsingTopNavbar('Register');

  await t
    .expect(logger.requests[0].request.url)
    .eql(homePage.url)
    .expect(registerPage.header.exists)
    .ok()
    .expect(getPageUrl())
    .eql(registerPage.url);
});

test.page(loginPage.url).requestHooks(logger)('Open user registartion page from a login page', async t => {
  await t.click(loginPage.registerButton);

  await t
    .expect(logger.requests[0].request.url)
    .eql(loginPage.url)
    .expect(registerPage.header.exists)
    .ok()
    .expect(registerPage.url)
    .contains(await getPageUrl());
});

test('it is impossible to register user without providing required data', async t => {
  await registerPage.clickRegisterButton();

  ['FirstName', 'LastName', 'Email', 'Password', 'ConfirmPassword'].forEach(
    async inputName => await t.expect(registerPage.inputErrorClass(inputName).exists).ok()
  );
  await t.expect(getPageUrl()).eql(registerPage.url);
});

test('Email input validation', async t => {
  registerPage.setUserFullName(primaryUser.firstName, primaryUser.lastName);
  registerPage.setPassword(primaryUser.password);
  registerPage.setUserEmail('');

  registerPage.clickRegisterButton();

  registerPage.setUserEmail('a@');
  await t
    .expect(registerPage.inputErrorClass('Email').exists)
    .ok()
    .expect(registerPage.inputErrorText('Email').innerText)
    .eql('Wrong email');
  registerPage.setUserEmail(primaryUser.email);
  await t.expect(registerPage.inputErrorClass('Email').exists).notOk();

  registerPage.setUserEmail('@');
  await t
    .expect(registerPage.inputErrorClass('Email').exists)
    .ok()
    .expect(registerPage.inputErrorText('Email').innerText)
    .eql('Wrong email');
  registerPage.setUserEmail(primaryUser.email);
  await t.expect(registerPage.inputErrorClass('Email').exists).notOk();

  registerPage.setUserEmail('a@a.');
  await t
    .expect(registerPage.inputErrorClass('Email').exists)
    .ok()
    .expect(registerPage.inputErrorText('Email').innerText)
    .eql('Wrong email');
  registerPage.setUserEmail(primaryUser.email);
  await t.expect(registerPage.inputErrorClass('Email').exists).notOk();

  registerPage.setUserEmail('test@@test.test');
  await t
    .expect(registerPage.inputErrorClass('Email').exists)
    .ok()
    .expect(registerPage.inputErrorText('Email').innerText)
    .eql('Wrong email');
  registerPage.setUserEmail(primaryUser.email);
  await t.expect(registerPage.inputErrorClass('Email').exists).notOk();

  registerPage.setUserEmail('a@a.a.');
  await t
    .expect(registerPage.inputErrorClass('Email').exists)
    .ok()
    .expect(registerPage.inputErrorText('Email').innerText)
    .eql('Wrong email');
  registerPage.setUserEmail(primaryUser.email);
  await t.expect(registerPage.inputErrorClass('Email').exists).notOk();
});

test('Password minimum length validation', async t => {
  registerPage.setPassword('a');
  await t
    .expect(registerPage.inputErrorClass('Password').exists)
    .ok()
    .expect(registerPage.inputErrorText('Password').innerText)
    .eql(`Password must meet the following rules:\n\nmust have at least 6 characters`)
    .expect(registerPage.inputErrorClass('ConfirmPassword').exists)
    .notOk();
});

test('Empty string is not a correct password', async t => {
  registerPage.setUserFullName(primaryUser.firstName, primaryUser.lastName);
  registerPage.setUserEmail(primaryUser.email);

  registerPage.setPassword('      ');
  registerPage.clickRegisterButton();
  await t
    .expect(registerPage.inputErrorClass('Password').exists)
    .ok()
    .expect(registerPage.inputErrorText('Password').innerText)
    .eql('Password is required.')
    .expect(registerPage.inputErrorClass('ConfirmPassword').exists)
    .ok()
    .expect(registerPage.inputErrorText('ConfirmPassword').innerText)
    .eql('Password is required.');
});

test('Password confirmation has to match the password input content', async t => {
  registerPage.setPassword('123456', '123458');
  registerPage.clickRegisterButton();
  await t
    .expect(registerPage.inputErrorClass('Password').exists)
    .notOk()
    .expect(registerPage.inputErrorClass('ConfirmPassword').exists)
    .ok()
    .expect(registerPage.inputErrorText('ConfirmPassword').innerText)
    .eql('The password and confirmation password do not match.');
});

test.requestHooks(logger)('User with correct data provided is created correctly', async t => {
  registerPage.setGender(primaryUser.gender);
  registerPage.setUserFullName(primaryUser.firstName, primaryUser.lastName);
  registerPage.setDateOfBirth(primaryUser.dateOfBirth);
  registerPage.setUserEmail(primaryUser.email);
  registerPage.setCompanyName(primaryUser.companyName);
  registerPage.newsletterChecbox(false);
  registerPage.setPassword(primaryUser.password);
  registerPage.clickRegisterButton();

  await t
    .expect(logger.contains(record => record.response.statusCode === 200))
    .ok()
    .expect(getPageUrl())
    .eql(restultPage.url)
    .expect(restultPage.resultMessage.innerText)
    .eql('Your registration completed');

  restultPage.clickContinueButton();
  await t.expect(getPageUrl()).eql(homePage.url);
});

test('Email address has to be unique', async t => {
  const usedEmail = await registerPage.setUserEmail(primaryUser.email);

  registerPage.setUserFullName(primaryUser.firstName, primaryUser.lastName);
  registerPage.setPassword(primaryUser.password);
  registerPage.clickRegisterButton();
  await t.expect(restultPage.resultMessage.innerText).eql('Your registration completed');

  await t.navigateTo(registerPage.url).typeText(registerPage.emailInput, usedEmail);

  registerPage.setUserFullName(primaryUser.firstName + 'rand', primaryUser.lastName);
  registerPage.setPassword(primaryUser.password);

  registerPage.clickRegisterButton();
  await t.expect(registerPage.existingEmailValidationError.exists).ok();
});
