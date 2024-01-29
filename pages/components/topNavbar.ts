import { Selector, t } from 'testcafe';

class TopNavbar {
  linksContainer = Selector('div.header-links ul li');
  shoppingCartCounter = Selector('li#topcartlink span.cart-qty');

  clickTopNavbarLink = async (linkName: string) => {
    await t.click(this.linksContainer.find('a').withText(linkName));
  };

  getShoppingCartCounter = async () => this.shoppingCartCounter.innerText;
}

export default new TopNavbar();
