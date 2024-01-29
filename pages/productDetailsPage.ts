import { Selector, t } from 'testcafe';

class ProductDetailsPage {
  url: string;
  header: Selector;
  minQuantityNotification: Selector;
  addToCartButton: Selector;

  constructor(productName: string) {
    this.url = `https://demo.nopcommerce.com/${productName.replace(/ /g, '-').replace('.', '').toLocaleLowerCase()}`;
    this.header = Selector('.product-name h1').withExactText(productName);
    this.minQuantityNotification = Selector('.min-qty-notification');
    this.addToCartButton = Selector('button').withText('ADD TO CART');
  }

  clickAddToCartButton = () => t.click(this.addToCartButton);
}

export default ProductDetailsPage;
