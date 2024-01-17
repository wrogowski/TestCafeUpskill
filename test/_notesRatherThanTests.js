import { ClientFunction, Selector } from 'testcafe';

// testcafe/example page locators
const nameInput = Selector('input#developer-name');
const windowsOsRadioButton = Selector('label[for="windows"] input#windows');
const macOsRadioButton = Selector('label[for="windows"] input#windows');
const submitButton = Selector('button#submit-button');
const interfaceDropdown = Selector('select#preferred-interface');
const interfaceOptions = interfaceDropdown.find('option');
const enableScaleCheckbox = Selector('input#tried-test-cafe');
const slider = Selector('div#slider span');

// the-internet app locators
const iFrame = Selector('iframe#mce_0_ifr');
const textArea = Selector('body#tinymce');
const fileMenuButton = Selector('button[role="menuitem"]');
const newDocumentOption = Selector('div[title="New document"]');
const fileSelectorButton = Selector('input#file-upload');
const fileSubmitButton = Selector('input#file-submit');
const uploadedFilesList = Selector('div#uploaded-files');

fixture('TestCafe tutorial tests and notes').page(
  'https://devexpress.github.io/testcafe/example/'
);

test.meta({ type: 'smoke' })(
  // to run only a specified specs: testcafe chrome tests/test.js --test-meta type="smoke" --live
  'it registers user with a specified OS system',
  async t => {
    const getCurrentUrl = ClientFunction(() => window.location.href);

    await t
      .typeText(nameInput, 'odziorr')
      .click(windowsOsRadioButton)
      .click(submitButton)
      .expect(getCurrentUrl())
      .contains('thank-you', 'the url is wrong: ' + (await getCurrentUrl()));
  }
);

test.meta({ type: 'smoke', type: 'regression' }).page('google.com')(
  'opens the main page and navigates to user form',
  async t => {
    await t
      .navigateTo('https://devexpress.github.io/testcafe/example/')
      .typeText(nameInput, 'odziorrrrrrrrrrrrr')
      .click(macOsRadioButton)
      .click(submitButton);
  }
);

test
  .meta({ type: 'regression' })
  .page('http://the-internet.herokuapp.com/iframe')(
  'it manages some iFrame shit',
  async t => {
    await t
      .switchToIframe(iFrame)
      .click(textArea)
      .pressKey('ctrl+a delete')
      .typeText(textArea, 'dupa!')
      .expect(textArea.innerText)
      .contains('dupa!')
      .switchToMainWindow()
      .click(fileMenuButton)
      .click(newDocumentOption)
      .switchToIframe(iFrame)
      .expect(textArea.innerText)
      .eql('\n');
  }
);

test.meta({ type: 'smoke' })(
  'It selects a specified option from the dropdown',
  async t => {
    await t
      .click(interfaceDropdown)
      .click(interfaceOptions.withText('Both'));
  }
);

test.page('http://the-internet.herokuapp.com/upload')(
  'Upload files',
  async t => {
    await t
      .setFilesToUpload(fileSelectorButton, [
        '../helpers/test_files/textFile.txt',
        '../helpers/test_files/anotherTextFile.txt',
      ])
      .click(fileSubmitButton)
      .expect(uploadedFilesList.innerText)
      .eql('anotherTextFile.txt');
  }
);

test('Drag slider and check if it is disabled', async t => {
  await t
    .click(enableScaleCheckbox)
    .drag(slider, 250, 0)
    .expect(slider.attributes)
    .contains({ style: 'left: 33.3333%;' });

  await t
    .click(enableScaleCheckbox)
    .expect(slider.parent(0).hasClass('ui-slider-disabled'))
    .ok('the slider has a class, but it might be wrong :)')
    .expect(slider.attributes)
    .contains({ style: 'left: 33.3333%;' });
});
