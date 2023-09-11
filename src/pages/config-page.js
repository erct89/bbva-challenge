import { LitElement, css, html } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

class ConfigPage extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'config-page';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  // constructor() {
  //   super();
  // }

  render() {
    return html`Config`;
  }
}

customElements.define(ConfigPage.is, ConfigPage);
