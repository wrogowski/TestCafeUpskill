import RegisterPage from "../pages/registerPage";
import CustomerInfoPage from "../pages/customerInfoPage";
import topNavbar from "../pages/components/topNavbar";
import { primaryUserRole, secondaryUser } from "../helpers/users";
import { Role } from "testcafe";

const registerPage = new RegisterPage();
let customerInfoPage: CustomerInfoPage;

fixture("Created user is able to login and edit his data")
  .beforeEach(async t => {
    customerInfoPage = new CustomerInfoPage(t);
    await t.useRole(primaryUserRole).maximizeWindow();
  })
  .afterEach(async t => t.useRole(Role.anonymous()))
  .page(registerPage.url)

test('Change primaryUser data to secondaryUser', async (t) => {
  await topNavbar.clickTopNavbarLink('My account');
  await t.expect(customerInfoPage.header.exists).ok();

  await customerInfoPage.fillFormWithUserData(secondaryUser);
  await t.expect(customerInfoPage.successNotificationBar.exists).ok()
    .expect(customerInfoPage.firstNameInput.value).eql(secondaryUser.firstName)
    .expect(customerInfoPage.lastNameInput.value).eql(secondaryUser.lastName)
    .expect(customerInfoPage.selectBDayDay.value).eql(secondaryUser.dateOfBirth.day)
    .expect(customerInfoPage.selectBDayYear.value).eql(secondaryUser.dateOfBirth.year)
    .expect(customerInfoPage.emailInput.value).contains(secondaryUser.email)
    .expect(customerInfoPage.companyNameInput.value).eql(secondaryUser.companyName);
});

