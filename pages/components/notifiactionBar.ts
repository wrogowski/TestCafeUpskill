import { Selector } from 'testcafe';

class NotifiactionBar {
  successNotificationBar = Selector('#bar-notification .success');
  closeButton = this.successNotificationBar.find('span.close');
  barContent = this.successNotificationBar.find('p.content');
  shoppingCartLink = this.barContent.find('a[href="/cart"]');
}

export default NotifiactionBar;
