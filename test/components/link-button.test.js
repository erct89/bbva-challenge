import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/link-button.js';

describe('LinkButton', () => {
  let linkButton;
  let rootElement;

  beforeEach(async () => {
    linkButton = await fixture(
      html`<link-button href="https://example.com">Click Me</link-button>`
    );
    rootElement = linkButton.shadowRoot.querySelector('a');
  });

  it('should render an anchor element with the provided href', () => {
    expect(linkButton).to.exist;
    expect(linkButton.href).to.equal('https://example.com');
    expect(linkButton.textContent).to.equal('Click Me');
  });

  it('should update the href when the "href" property changes', async () => {
    linkButton.href = 'https://newurl.com';
    await linkButton.updateComplete;
    expect(rootElement.href).to.equal('https://newurl.com/');
  });
});
