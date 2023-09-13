import { LitElement, html, css } from 'lit';

import '../components/radio-button-group.js';
import '../components/link-button.js';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

class ConfigPage extends CommonComponentMixin(LitElement) {
  static get is() {
    return `config-page`;
  }

  static get properties() {
    return {
      config: { type: Object },
    };
  }

  static get styles() {
    return css``;
  }

  get levels() {
    return this.config?.levels || [];
  }

  get currentLevel() {
    return this.config?.level || {};
  }

  get currentNumberCardsToFind() {
    return this.config?.numberCardsToFind || {};
  }

  get numberCardsToFind() {
    return this.config?.optionsNumbersCardsToFind || [];
  }

  constructor() {
    super();
    this.config = {};
  }

  _handleRadioGroupChange(event) {
    const { target, detail } = event;
    const targeName = target.radioGroupName;

    this.config = { ...this.config, [targeName]: detail };

    this._dispatch('configs-change', this.config);
  }

  render() {
    return html`
      <section>
        <div>
          <radio-button-group
            label="Level"
            radio-group-name="level"
            .options="${this.levels}"
            .selectedOption="${this.currentLevel}"
            @radio-button-group-change="${this._handleRadioGroupChange}"
          ></radio-button-group>
          <radio-button-group
            label="Number of card to find"
            radio-group-name="numberCardsToFind"
            .options="${this.numberCardsToFind}"
            .selectedOption="${this.currentNumberCardsToFind}"
            @radio-button-group-change="${this._handleRadioGroupChange}"
          ></radio-button-group>
        </div>
      </section>
    `;
  }
}

customElements.define(ConfigPage.is, ConfigPage);
