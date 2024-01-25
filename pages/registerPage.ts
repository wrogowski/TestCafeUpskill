import { Selector, t } from 'testcafe';
import { faker } from '@faker-js/faker';
import { selectOption } from '../page_methods/commonMethods';
import { User } from '../helpers/users';

class RegisterPage {
  [key: string]: Selector | Function;
  url = () => 'https://demo.nopcommerce.com/register?returnUrl=%2F';
  header = Selector('h1').withExactText('Register');
  genderRadioButtons = (gender: string) => Selector(`div#gender input#gender-${gender}`);

  firstNameInput = Selector('#FirstName');
  lastNameInput = Selector('#LastName');
  emailInput = Selector('#Email');
  companyNameInput = Selector('#Company');
  passwordInput = Selector('#Password');
  confirmPasswordInput = Selector('#ConfirmPassword');
  inputErrorClass = (inputName: string) => Selector(`input#${inputName}.input-validation-error`);
  inputErrorText = (inputName: string) => Selector(`span[data-valmsg-for="${inputName}"]`);
  existingEmailValidationError = Selector('.message-error.validation-summary-errors').withText(
    'The specified email already exists'
  );

  newsletterChecbox = Selector('input#Newsletter');

  selectBDayDay = Selector('select[name="DateOfBirthDay"]');
  selectBDayMonth = Selector('select[name="DateOfBirthMonth"]');
  selectBDayYear = Selector('select[name="DateOfBirthYear"]');

  registerButton = Selector('#register-button');
  verificationToken = Selector('input[name="__RequestVerificationToken"]');

  // REGISTER PAGE METHODS

  setGender = async (gender: string) => await t.click(this.genderRadioButtons(gender));

  setUserFullName = async (firstName: string, lastName: string) => {
    await t
      .typeText(this.firstNameInput, firstName, { paste: true })
      .typeText(this.lastNameInput, lastName, { paste: true });
  };

  setDateOfBirth = async ({ day, month, year }: { day: string; month: string; year: string }) => {
    selectOption(t, this.selectBDayDay, day);
    selectOption(t, this.selectBDayMonth, month);
    selectOption(t, this.selectBDayYear, year);
  };

  setUserEmail = async (email: string) => {
    const randomPrefix = faker.string.alpha(10);
    const randomizedEmail = randomPrefix + '_' + email;
    await t
      .typeText(this.emailInput, randomizedEmail, {
        paste: true,
        replace: true,
      })
      .click(this.header);

    return randomizedEmail;
  };

  setCompanyName = async (companyName: string) => await t.typeText(this.companyNameInput, companyName, { paste: true });

  setPassword = async (password: string, passwordConfirmation = password) =>
    await t
      .typeText(this.passwordInput, password, { paste: true })
      .typeText(this.confirmPasswordInput, passwordConfirmation, { paste: true });

  setNewsletterCheckbox = async (state = true) => {
    const currentCheckboxState = await Selector(this.newsletterChecbox()).hasAttribute('checked');

    if ((state === true && currentCheckboxState === false) || (state === false && currentCheckboxState === true)) {
      await t.click(this.newsletterChecbox);
    }
  };

  clickRegisterButton = async () => t.click(this.registerButton);

  createUser = async (user: User, withFullData = false) => {
    await t.navigateTo(this.url());

    const credentials = { login: '', password: user.password };

    this.setUserFullName(user.firstName, user.lastName);
    credentials.login = await this.setUserEmail(user.email);
    this.setPassword(credentials.password);

    if (withFullData) {
      this.setGender(user.gender);
      this.setDateOfBirth(user.dateOfBirth);
      this.setCompanyName(user.companyName);
    }
    this.clickRegisterButton();

    return credentials;
  };
}

export default RegisterPage;
