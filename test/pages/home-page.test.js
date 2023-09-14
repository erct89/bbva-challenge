import { html, fixture, expect, oneEvent } from '@open-wc/testing';
import sinon from 'sinon';

import '../../src/components/input-text.js';
import '../../src/components/link-button.js';
import '../../src/pages/home-page.js';

describe('HomePage', () => {
  let homePage;
  let inputText;
  let linkButton;

  beforeEach(async () => {
    homePage = await fixture(html`<home-page></home-page>`);
    inputText = homePage.shadowRoot.querySelector('input-text');
    linkButton = homePage.shadowRoot.querySelector('link-button');
  });

  it('renders input-text with the correct label', () => {
    expect(inputText).to.exist;

    // Verifica que el componente input-text tenga la etiqueta "User Name"
    expect(inputText.label).to.equal('User Name');
  });

  it('displays an error message when user input is invalid', async () => {
    // Simula una entrada de usuario inválida
    inputText.inputValue = 'a'; // Menos de 3 caracteres, lo que es inválido
    inputText.dispatchEvent(
      new CustomEvent('input-text-change', { detail: 'a' })
    );
    await homePage.updateComplete;

    // Simula el registro.
    linkButton.click();
    await homePage.updateComplete;

    const errorMessage = homePage.shadowRoot.querySelector('.error-message');
    expect(errorMessage).to.exist;
  });

  it('displays an error message when user input is empty', async () => {
    expect(homePage.user).to.equal('');

    // Simula el registro.
    linkButton.click();
    await homePage.updateComplete;

    const errorMessage = homePage.shadowRoot.querySelector('.error-message');
    expect(errorMessage).to.exist;
  });

  it('dispatches "user-name-changed" event when user input is valid', async () => {
    const eventListener = oneEvent(homePage, 'user-name-changed');

    // Simula una entrada de usuario válida
    const userMock = 'emilio';
    inputText.inputValue = userMock;
    inputText.dispatchEvent(
      new CustomEvent('input-text-change', { detail: userMock })
    );
    await homePage.updateComplete;

    // Simula el registro.
    linkButton.click();
    await homePage.updateComplete;

    const { detail } = await eventListener;
    expect(detail).to.equal(userMock);
  });

  it('prevents navigation when user input is invalid', async () => {
    const eventSpy = sinon.spy();
    homePage.addEventListener('user-name-changed', eventSpy);

    inputText.inputValue = 'a'; // Menos de 3 caracteres, lo que es inválido
    inputText.dispatchEvent(
      new CustomEvent('input-text-change', { detail: 'a' })
    );
    await homePage.updateComplete;

    linkButton.click();
    await homePage.updateComplete;

    expect(eventSpy.called).to.be.false;
  });
});
