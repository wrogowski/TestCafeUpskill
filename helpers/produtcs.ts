import ProductDetailsPage from '../pages/productDetailsPage';

export interface Product {
  name: string;
  price: string;
  sku: string;
  detailsPage: ProductDetailsPage;
}

export const macBook: Product = {
  name: 'Apple MacBook Pro 13-inch',
  price: '$1,800.00',
  sku: 'AP_MBP_13',
  detailsPage: new ProductDetailsPage('Apple MacBook Pro 13-inch'),
};

export const htcOne: Product = {
  name: 'HTC One M8 Android L 5.0 Lollipop',
  price: '$245.00',
  sku: 'M8_HTC_5L',
  detailsPage: new ProductDetailsPage('HTC One M8 Android L 5.0 Lollipop'),
};
