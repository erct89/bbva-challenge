import { LitElement, css, html } from 'lit';

class ConfigPage extends LitElement {
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
