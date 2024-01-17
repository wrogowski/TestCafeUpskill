import { Selector, t } from 'testcafe';

class TopNavbar {
  linksContainer = Selector('div.header-links ul li');

  clickTopNavbarLink = async (linkName: string) => {
    await t.click(this.linksContainer.find('a').withText(linkName));
  };
}

export default new TopNavbar();
