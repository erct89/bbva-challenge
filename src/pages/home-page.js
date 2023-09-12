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
      appHeader: {
        type: String,
        attribute: 'app-header'
      },
      user: {
        type: String,
      },
      messageError: {
        type: String,
      },
      regex: {
        type: String,
      },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.user = '';
    this.messageError = '';
    this.regex = /^[a-zA-Z][a-zA-Z0-9]{3,5}$/;
  }

  _isUserValid() {
    return this.regex.test(this.user);
  }

  _handleRegister(event) {
    if (!this._isUserValid()) {
      event.preventDefault();
      this.messageError = 'Minimun between 3 and 8 characters (a-z).';
      return;
    }

    this.dispatchEvent(
      new CustomEvent('user-name-changed', {
        detail: this.user,
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleInputTextChange(event) {
    const { detail } = event;
    this.user = detail;
    this.messageError = '';
  }

  get _renderErrorMessage() {
    return this.messageError
      ? html`<div class="error-message">${this.messageError}</div>`
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
          .inputValue="${this.user}"
          .regex="${this.regex}"
          message-error="User name is no valid"
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
