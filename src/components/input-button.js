import { LitElement, html } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import styles from './input-button-styles.js';

class InputButton extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'input-button';
  }

  static get properties() {
    return {
      label: {
        type: String,
      },
    };
  }

  static get styles() {
    return [styles];
  }

  render() {
    return html`<div>
      <input
        type="button"
        .value="${this.label}"
      ></input>
    </div>`;
  }
}

customElements.define(InputButton.is, InputButton);
