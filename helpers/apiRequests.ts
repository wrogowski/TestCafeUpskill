import { t } from 'testcafe';
import { faker } from '@faker-js/faker';

export const createValidUserByApi = async (registerButtonToken: string) => {
  const credentials = {
    login: faker.internet.email(),
    password: faker.internet.password()
  };

  await t.request.post({
    url: 'https://demo.nopcommerce.com/register?returnurl=%2Flogin',
    body: {
      Gender: 'M',
      FirstName: faker.person.firstName('male'),
      LastName: faker.person.lastName(),
      DateOfBirthDay: faker.number.int({min: 1, max: 28}),
      DateOfBirthMonth: faker.number.int({min: 1, max: 12}),
      DateOfBirthYear: faker.number.int({min: 1914, max: 2024}),
      Email: credentials.login,
      Company: '',
      Newsletter: [
        true,
      ],
      Password: credentials.password,
      ConfirmPassword: credentials.password,
      'register-button': '',
      __RequestVerificationToken: registerButtonToken
    }
  });
  return credentials;
}
