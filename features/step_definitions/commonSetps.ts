import { Then } from '@cucumber/cucumber';
import { Selector, t } from 'testcafe';

Then(/^I click the "(.*)" button$/, async (t, [buttonName]) => {
  await t.click(Selector('button').withExactText(buttonName));
});
