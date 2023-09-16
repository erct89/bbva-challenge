import { LitElement, html, nothing } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';
import { PageComponentMixin } from '../mixins/page-component-mixin.js';

import '../components/input-text.js';
import '../components/link-button.js';

import styles from './home-page-styles.js';

class HomePage extends PageComponentMixin(CommonComponentMixin(LitElement)) {
  static get is() {
    return 'home-page';
  }

  static get properties() {
    return {
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
    this._showError = false;
    this.config = {
      allowedCharacters: /[a-zA-Z0-9ñÑ]/,
      appHeader: '',
      messageValidError: 'User is invalid',
      validationUserPatter: /^[a-zA-Z0-9ñÑ]{3,8}$/,
      user: '',
    };
  }

  get allowedCharacters() {
    return this.getData('allowedCharacters');
  }

  get appHeader() {
    return this.getData('appHeader');
  }

  get messageValidError() {
    return this.getData('messageValidError');
  }

  get validationUserPatter() {
    return this.getData('validationUserPatter');
  }

  get user() {
    return this.getData('user');
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
    this.setData('user', detail);
    this._showError = false;
  }

  get _renderErrorMessage() {
    return this._showError
      ? html`<div class="error-message">${this.messageValidError}</div>`
      : nothing;
  }

  render() {
    return html`<section>
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
