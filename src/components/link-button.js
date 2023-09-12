import { LitElement, html } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import styles from './link-button-styles.js';

class LinkButton extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'link-button';
  }

  static get properties() {
    return {
      href: { type: String },
    };
  }

  static get styles() {
    return [styles];
  }

  render() {
    return html`<div>
      <a href="${this.href}"><slot></slot></a>
    </div>`;
  }
}

customElements.define(LinkButton.is, LinkButton);
