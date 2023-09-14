import { html, fixture, expect } from '@open-wc/testing';
import '../../src/components/input-button.js';

describe('InputButton', () => {
  let inputButton;
  let rootElement;

  beforeEach(async () => {
    inputButton = await fixture(
      html`<input-button label="Click Me"></input-button>`
    );
    rootElement = inputButton.shadowRoot.querySelector('input[type="button"]');
  });

  it('should render a button input with the provided label', () => {
    expect(rootElement).to.exist;
    expect(rootElement.value).to.equal('Click Me');
  });

  it('should update the label when the "label" property changes', async () => {
    inputButton.label = 'New Label';
    await inputButton.updateComplete;

    expect(rootElement.value).to.equal('New Label');
  });
});
