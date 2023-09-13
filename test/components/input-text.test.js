import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../../src/components/input-text.js';

describe('InputText', () => {
  let inputText;
  let inputHtml;

  beforeEach(async () => {
    inputText = await fixture(html`<input-text></input-text>`);
    inputHtml = inputText.shadowRoot.querySelector('input');
  });

  it('should initialize with default values', () => {
    expect(inputText.inputValue).to.equal('');
    expect(inputText.inputName).to.equal('input-text');
    expect(inputText.label).to.equal('');
    expect(inputText.maxLength).to.equal(Infinity);
    expect(inputText.messageMaxError).to.equal('');
    expect(inputText.messageMinError).to.equal('');
    expect(inputText.minLength).to.equal(0);
    expect(inputText._hasError).to.be.false;
  });

  it('should handle input change and dispatch event', async () => {
    const eventSpy = sinon.spy();
    const newValue = 'New Value';

    inputText.addEventListener('input-text-change', eventSpy, { once: true });

    inputHtml.value = newValue;
    inputHtml.dispatchEvent(new Event('input'));

    expect(inputText.inputValue).to.equal(newValue);
    expect(eventSpy.calledOnce).to.be.true;
    expect(eventSpy.firstCall.args[0].detail).to.equal(newValue);
  });

  it('should prevent input of disallowed characters', async () => {
    const newValue = 'Test';
    inputText.allowedCharacters = /^[A-Za-z0-9]+$/;

    inputText.inputValue = newValue;
    await inputText.updateComplete;

    inputHtml.dispatchEvent(new KeyboardEvent('keypress', { key: '@' }));

    expect(inputHtml.value).to.equal(newValue);
    expect(inputText.inputValue).to.equal(newValue);
  });

  it('should show length error message when input is out of range', async () => {
    inputText.minLength = 3;
    inputText.maxLength = 5;
    inputText.messageMinError = 'Too short';
    inputText.messageMaxError = 'Too long';

    // Demasiado corto
    inputHtml.value = '12';
    inputHtml.dispatchEvent(new Event('input'));
    await inputText.updateComplete;

    expect(
      inputText.shadowRoot.querySelector('.error-message').textContent
    ).to.equal('Too short');

    // Demasiado largo
    inputHtml.value = '123456';
    inputHtml.dispatchEvent(new Event('input'));
    await inputText.updateComplete;

    expect(
      inputText.shadowRoot.querySelector('.error-message').textContent
    ).to.equal('Too long');
  });

  it('should not show error message when input length is valid', async () => {
    inputText.minLength = 3;
    inputText.maxLength = 5;
    inputText.messageMinError = 'Too short';
    inputText.messageMaxError = 'Too long';

    // Longitud válida
    inputHtml.value = '1234';
    inputHtml.dispatchEvent(new Event('input'));
    await inputText.updateComplete;

    expect(inputText.shadowRoot.querySelector('.error-message')).to.be.null;
  });

  it('should add "filled" class when input is not empty', async () => {
    // Input vacío
    expect(inputText.shadowRoot.querySelector('.filled')).to.be.null;

    // Input no vacío
    inputHtml.value = 'Text';
    inputHtml.dispatchEvent(new Event('input'));
    await inputText.updateComplete;

    expect(inputText.shadowRoot.querySelector('.filled')).to.not.be.null;
  });

  it('should check if character is allowed', () => {
    // Caracteres permitidos: letras mayúsculas, letras minúsculas y números
    inputText.allowedCharacters = /^[A-Za-z0-9]+$/;

    // Caracteres permitidos
    expect(inputText._isAllowedCharacters('A')).to.be.true;
    expect(inputText._isAllowedCharacters('z')).to.be.true;
    expect(inputText._isAllowedCharacters('5')).to.be.true;

    // Caracter no permitido
    expect(inputText._isAllowedCharacters('@')).to.be.false;
    expect(inputText._isAllowedCharacters('*')).to.be.false;
  });
});
