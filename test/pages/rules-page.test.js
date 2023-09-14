import { html, fixture, expect } from '@open-wc/testing';
import '../../src/pages/rules-page.js';

describe('RulesPage', () => {
  let rulesPage;

  beforeEach(async () => {
    rulesPage = await fixture(html`<rules-page></rules-page>`);
  });

  it('renders a description and rules correctly', () => {
    const description = rulesPage.shadowRoot.querySelector('h4');
    expect(description).to.exist;
    expect(description.textContent).to.equal('Description');

    const rulesList = rulesPage.shadowRoot.querySelector('ol');
    expect(rulesList).to.exist;

    const rulesItems = rulesList.querySelectorAll('li');
    expect(rulesItems).to.have.lengthOf(5);
  });
});
