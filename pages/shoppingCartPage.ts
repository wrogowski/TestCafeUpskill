import { Selector } from 'testcafe';

class ShoppingCartPage {
  url = 'https://demo.nopcommerce.com/cart';
  itemsTable = Selector('table.cart');
  itemRow = this.itemsTable.find('tr');

  getProductRow = (productName: string) => {
    const row = this.itemRow.find('td.product a.product-name').withExactText(productName).parent('tr');
    return {
      sku: row.find('.sku'),
      image: row.find('.product-picture'),
      name: row.find('.product-name'),
      price: row.find('.unit-price'),
      quantity: row.find('.product-quantity'),
      total: row.find('.subtotal'),
      removeButton: row.find('.remove-from-cart button'),
    };
  };
}

export default ShoppingCartPage;
