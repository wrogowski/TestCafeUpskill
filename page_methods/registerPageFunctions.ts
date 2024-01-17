import RegisterPage from '../pages/registerPage';

class RegisterPageFunctions {
  registerPage = new RegisterPage()

  fillMandatoryData = async (userData: { firstName: string, lastName: string, email: string, password: string }) => {
    await this.registerPage.setUserFullName(userData.firstName, userData.lastName);
    await this.registerPage.setUserEmail(userData.email);
    await this.registerPage.setPassword(userData.password);
  };
}

export default RegisterPageFunctions;
