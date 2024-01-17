import { Selector, t } from 'testcafe';

class RegisterResultPage {
    url = 'https://demo.nopcommerce.com/registerresult/1?returnUrl=/';

    header = Selector('div.page-title h1');
    resultMessage = Selector('div.result');
    continueButton = Selector('a.register-continue-button');

  clickContinueButton = async () => await t.click(this.continueButton);
}

export default RegisterResultPage;
