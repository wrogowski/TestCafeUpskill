import { Selector, t } from 'testcafe';

class HomePage {
    url = 'https://demo.nopcommerce.com/';
    header = Selector('h2').withText('Welcome to our store');
    currencyDropdown = Selector('select#customerCurrency');
    searchbar = Selector('input#small-searchterms');

  searchForProduct = async (product: string) => t.typeText(this.searchbar, product).pressKey('enter');

  selectCurrency = async (currency: string) => {
    await t.click(this.currencyDropdown);
    await t.click(this.currencyDropdown.find('option').withText(currency));

    return await this.currencyDropdown.innerText;
  };
}

export default HomePage;
