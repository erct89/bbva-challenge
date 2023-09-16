import { LitElement, html, css } from 'lit';

import '../components/radio-button-group.js';
import '../components/link-button.js';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';
import { PageComponentMixin } from '../mixins/page-component-mixin.js';

class ConfigPage extends PageComponentMixin(CommonComponentMixin(LitElement)) {
  static get is() {
    return `config-page`;
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  get levels() {
    return this.getData('levels', []);
  }

  get currentLevel() {
    return this.getData('level', {});
  }

  get currentNumberCardsToFind() {
    return this.getData('numberCardsToFind', {});
  }

  get numberCardsToFind() {
    return this.getData('optionsNumbersCardsToFind', []);
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
