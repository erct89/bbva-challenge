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
      inputName: { type: String, attribute: 'input-name' },
      label: { type: String },
      messageError: { type: String, attribute: 'message-error' },
      regex: { type: Object },
      inputValue: { type: String, attribute: 'input-value' },
      _hasError: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.label = '';
    this.inputValue = '';
    this.messageError = '';
    this.inputName = 'input-text';
    this.regex = /^[a-zA-Z][a-zA-Z0-9]{3,8}$/;
    this._hasError = false;
  }

  get _renderError() {
    return this._hasError
      ? html`<div class="error-message">${this.messageError}</div>`
      : nothing;
  }

  get _isValid() {
    return this.regex.test(this.inputValue);
  }

  _handleInputChange(event) {
    const newValue = event.target.value;
    this.inputValue = newValue;
    this._hasError = !this._isValid;
    this._dispatch('input-text-change', this.inputValue);
  }

  render() {
    return html`<div
      class="control ${classMap({ filled: this.inputValue.length > 0 })}"
    >
      <div class="field">
        <input
          class="input-text"
          type="text"
          name="${this.inputName}"
          autocomplete="off"
          .value="${this.inputValue}"
          @input="${this._handleInputChange}"
        />
        <label>User Name</label>
      </div>
      ${this._renderError}
    </div>`;
  }
}

customElements.define(InputText.is, InputText);
