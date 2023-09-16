import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import styles from './input-text-styles.js';

class InputText extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'input-text';
  }

  static get styles() {
    return [styles];
  }

  static get properties() {
    return {
      allowedCharacters: { type: Object, attribute: 'allowed-characters' },
      inputName: { type: String, attribute: 'input-name' },
      inputValue: { type: String, attribute: 'input-value' },
      label: { type: String },
      maxLength: { type: Number, attribute: 'max-length' },
      messageMaxError: { type: String, attribute: 'message-max-error' },
      messageMinError: { type: String, attribute: 'message-min-error' },
      minLength: { type: Number, attribute: 'min-length' },
      _hasError: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.allowedCharacters = /.+/g;
    this.inputValue = '';
    this.inputName = 'input-text';
    this.label = '';
    this.maxLength = Infinity;
    this.messageMaxError = '';
    this.messageMinError = '';
    this.minLength = 0;
    this._hasError = false;
  }

  _handleInputChange(event) {
    const newValue = event.target.value;
    this.inputValue = newValue;
    this._hasError = !this._isValidLength;
    this._dispatch('input-text-change', this.inputValue);
  }

  _isAllowedCharacters(character) {
    return this.allowedCharacters.test(character);
  }

  _handleKeyDown(event) {
    const { key } = event;
    if (!this._isAllowedCharacters(key)) {
      event.preventDefault();
    }
  }

  get _isValidLength() {
    const { length } = this.inputValue;
    return length >= this.minLength && length <= this.maxLength;
  }

  get _renderLengthError() {
    const { length } = this.inputValue;
    if (this._isValidLength) return nothing;

    if (length < this.minLength) {
      return html`<div class="error-message">${this.messageMinError}</div>`;
    }

    if (length > this.maxLength) {
      return html`<div class="error-message">${this.messageMaxError}</div>`;
    }

    return nothing;
  }

  get _renderErrors() {
    return this._hasError ? this._renderLengthError : nothing;
  }

  render() {
    return html`<div
      class="control ${classMap({ filled: this.inputValue?.length > 0 })}"
    >
      <div class="field">
        <input
          class="input-text"
          type="text"
          name="${this.inputName}"
          autocomplete="off"
          .value="${this.inputValue}"
          @keydown="${this._handleKeyDown}"
          @input="${this._handleInputChange}"
        />
        <label>User Name</label>
      </div>
      ${this._renderErrors}
    </div>`;
  }
}

customElements.define(InputText.is, InputText);
