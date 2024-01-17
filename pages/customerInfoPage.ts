import { Selector } from "testcafe";
import { faker } from "@faker-js/faker";
import { selectOption } from "../page_methods/commonMethods";
import { User } from "../helpers/users";

class CustomerInfoPage {
  constructor(testController: TestController) {
    this.t = testController;
  }
  t: TestController;
  url = 'https://demo.nopcommerce.com/customer/info'

  header = Selector('h1').withExactText('My account - Customer info');
  genderRadioButtons = (gender: string) => Selector(`input#gender-${gender}[type="radio"]`);

  firstNameInput = Selector('#FirstName');
  lastNameInput = Selector('#LastName');
  emailInput = Selector('#Email');
  companyNameInput = Selector('#Company');
  passwordInput = Selector('#Password');
  confirmPasswordInput = Selector('#ConfirmPassword');
  inputErrorClass = (inputName: string) => Selector(`input#${inputName}.input-validation-error`);
  inputErrorText = (inputName: string) => Selector(`span[data-valmsg-for="${inputName}"]`);
  existingEmailValidationError = Selector(
    '.message-error.validation-summary-errors'
  ).withText('The specified email already exists');

  newsletterChecbox = Selector('input#Newsletter');

  selectBDayDay = Selector('select[name="DateOfBirthDay"]');
  selectBDayMonth = Selector('select[name="DateOfBirthMonth"]');
  selectBDayYear = Selector('select[name="DateOfBirthYear"]');

  saveButton = Selector('button#save-info-button');
  successNotificationBar = Selector('.bar-notification.success p')
  .withExactText('The customer info has been updated successfully.');

  // PAGE FUNCTIONS
  setGender = async (gender: string) => await this.t.click(this.genderRadioButtons(gender));

  setUserFullName = async (firstName: string, lastName: string) => {
    await this.t
      .typeText(this.firstNameInput, firstName, { paste: true, replace: true })
      .typeText(this.lastNameInput, lastName, { paste: true, replace: true });
  };

  setDateOfBirth = async ({ day, month, year }: { day: string, month: string, year: string }) => {
    selectOption(this.t, this.selectBDayDay, day);
    selectOption(this.t, this.selectBDayMonth, month);
    selectOption(this.t, this.selectBDayYear, year);
  };

  setUserEmail = async (email: string) => {
    const randomPrefix = faker.string.alpha(10);
    const randomizedEmail = randomPrefix + '_' + email;
    await this.t
      .typeText(this.emailInput, randomizedEmail, {
        paste: true,
        replace: true,
      })
      .click(this.header);

    return randomizedEmail;
  };

  setCompanyName = async (companyName: string) =>
    await this.t.typeText(this.companyNameInput, companyName, { paste: true, replace: true });

  clickSaveButton = async () => await this.t.click(this.saveButton);

  fillFormWithUserData = async (user: User) => {
    const credentials = { login: '', password: user.password };

    this.setUserFullName(user.firstName, user.lastName);
    credentials.login = await this.setUserEmail(user.email);

    this.setGender(user.gender);
    this.setDateOfBirth(user.dateOfBirth);
    this.setCompanyName(user.companyName);
    this.clickSaveButton();

    return credentials;
  };
}

export default CustomerInfoPage;
