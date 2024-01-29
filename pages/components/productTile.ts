import { Selector, t } from 'testcafe';

class ProductTileComponent {
  private productName: string;
  private productTile: Selector;
  private price: Selector;
  private addToCartButton: Selector;

  constructor(productName: string) {
    this.productName = productName;
    this.productTile = Selector('a').withText(this.productName).parent('div.product-item');
    this.price = this.productTile.find('span.price');
    this.addToCartButton = this.productTile.find('button.product-box-add-to-cart-button');
  }

  clickAddToCartButton = async () => await t.click(this.addToCartButton);
}

export default ProductTileComponent;
