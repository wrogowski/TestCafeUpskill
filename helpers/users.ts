import { Role } from 'testcafe';
import LoginPage from '../pages/loginPage';
import RegisterPage from '../pages/registerPage';

const loginPage = new LoginPage();
const registerPage = new RegisterPage();

export interface User {
  gender: 'male' | 'female';
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: {
    day: string;
    month: string;
    year: string;
  };
  companyName: string;
  newsletterAgreement: boolean;
  password: string;
}

export class userUtils {
  static getFullName = async (user: User) => `${user.firstName} ${user.lastName}`;
  static calculateAge = async (user: User) => new Date().getFullYear() - parseInt(user.dateOfBirth.year) >= 18;
}

export const primaryUser: User = {
  gender: 'male',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@test.mail',
  dateOfBirth: {
    day: '1',
    month: 'January',
    year: '1999',
  },
  companyName: 'n/a',
  newsletterAgreement: false,
  password: 'pass123',
};

export const secondaryUser: User = {
  gender: 'female',
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'jane@test.mail',
  dateOfBirth: {
    day: '29',
    month: 'February',
    year: '2004',
  },
  companyName: 'Jane & co.',
  newsletterAgreement: true,
  password: '123pass',
};

export const primaryUserRole = Role(registerPage.url(), async t => {
  const credentials = await registerPage.createUser(primaryUser, true);
  await t.navigateTo(loginPage.url);
  await loginPage.loginWithCredentials(credentials.login, credentials.password);
});
