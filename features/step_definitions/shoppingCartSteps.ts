import HomePage from '../../pages/homePage';
import ProductTileComponent from '../../pages/components/productTile';
import { macBook, htcOne } from '../../helpers/produtcs';
import { getPageUrl, toCamelCase } from '../../page_methods/commonMethods';
import { t } from 'testcafe';
import { Given, When, Then } from '@cucumber/cucumber';
import topNavbar from '../../pages/components/topNavbar';
import NotifiactionBar from '../../pages/components/notifiactionBar';
import ShoppingCartPage from '../../pages/shoppingCartPage';

const homePage = new HomePage();
const shoppingCartPage = new ShoppingCartPage();
const notifiactionBar = new NotifiactionBar();
const productTiles = {
  macBook: new ProductTileComponent(macBook.name),
  htcOne: new ProductTileComponent(htcOne.name),
};
const products = {
  macBook,
  htcOne,
};

Given('I am on the main page', async () => {
  await t.navigateTo(homePage.url);
});
When('I click "Add to cart" button for "{word}" product', async (t, [productName]) => {
  await productTiles[productName as keyof typeof productTiles].clickAddToCartButton();
});

When(/^I add "(.*)" to the cart$/, async (t, [productName]) => {
  const productTile = productTiles[productName as keyof typeof productTiles];
  const product = products[productName as keyof typeof products];
  await productTile.clickAddToCartButton();

  if ((await getPageUrl()) === product.detailsPage.url) {
    await product.detailsPage.clickAddToCartButton();
  }
});

When('I open shopping cart details page using success bar link', async () => {
  await t.click(notifiactionBar.shoppingCartLink);
});

Then('I see {string} product details page', async (t, [productName]) => {
  const productDetailsPage = products[`${productName as keyof typeof products}`].detailsPage;

  await t.expect(productDetailsPage.header.exists).ok();
  await t.expect(getPageUrl()).eql(productDetailsPage.url);
});

Then('I see the minimum product available quantity set to {int}', async (t, [quantity]) => {
  const quantityNotificationText = `This product has a minimum quantity of ${quantity}`;
  await t.expect(macBook.detailsPage.minQuantityNotification.exists).ok();
  await t.expect(macBook.detailsPage.minQuantityNotification.textContent).eql(quantityNotificationText);
});

Then('I see {int} elements added to the cart', async (t, [quantity]) => {
  await t.expect(await topNavbar.getShoppingCartCounter()).eql(`(${quantity})`);
});

Then('I see "{word}" product row in the shopping cart', async (t, [productName]) => {
  const product = products[productName as keyof typeof products];
  const productRow = shoppingCartPage.getProductRow(product.name);

  console.log(await productRow.name.innerText);

  await t.expect(productRow.name.withExactText(product.name).exists).ok();
  await t.expect(productRow.sku.innerText).eql(product.sku);
  await t.expect(productRow.price.innerText).eql(product.price);
});
