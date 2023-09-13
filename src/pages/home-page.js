import { LitElement, html, nothing } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import '../components/input-text.js';
import '../components/link-button.js';

import styles from './home-page-styles.js';

class HomePage extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'home-page';
  }

  static get properties() {
    return {
      allowedCharacters: { type: Object, attribute: 'allowed-characters' },
      appHeader: { type: String, attribute: 'app-header' },
      user: {
        type: String,
      },
      messageValidError: {
        type: String,
        attribute: 'message-valid-error',
      },
      validationUserPatter: {
        type: Object,
        attribute: 'validation-user-pattern',
      },
      _showError: {
        type: Boolean,
        state: true,
      },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.allowedCharacters = /[a-zA-Z0-9]/;
    this.appHeader = '';
    this.messageValidError = 'User is invalid';
    this.validationUserPatter = /^[a-zA-Z0-9]{3,8}$/;
    this.user = '';
    this._showError = false;
  }

  _isUserValid() {
    return this.validationUserPatter.test(this.user);
  }

  _handleRegister(event) {
    if (!this._isUserValid()) {
      this._showError = true;
      event.preventDefault();
      return;
    }

    this._dispatch('user-name-changed', this.user);
  }

  _handleInputTextChange(event) {
    const { detail } = event;
    this.user = detail;
    this._showError = false;
  }

  get _renderErrorMessage() {
    return this._showError
      ? html`<div class="error-message">${this.messageValidError}</div>`
      : nothing;
  }

  render() {
    return html` <section>
      <header>
        <h1>${this.appHeader}</h1>
      </header>
      <main>
        <input-text
          label="User Name"
          .allowedCharacters="${this.allowedCharacters}"
          .inputValue="${this.user}"
          min-length="3"
          max-length="8"
          message-max-error="User maximum 8 characters."
          message-min-error="User minimum 3 characters."
          @input-text-change="${this._handleInputTextChange}"
          @input-text-valid="${this._handleInputTextValid}"
        ></input-text>
        ${this._renderErrorMessage}
        <link-button
          class="second"
          href="/game"
          @click="${this._handleRegister}"
          >Join</link-button
        >
      </main>
    </section>`;
  }
}

customElements.define(HomePage.is, HomePage);
