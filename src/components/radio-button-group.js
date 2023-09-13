import { LitElement, html } from 'lit';
import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import styles from './radio-button-group-styles.js';

class RadioButtonGroup extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'radio-button-group';
  }

  static get properties() {
    return {
      label: { type: String },
      options: { type: Array },
      selectedOption: { type: Object, attribute: 'selected-option' },
      radioGroupName: {
        type: String,
        attribute: 'radio-group-name',
        reflect: true,
      },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.options = [];
    this.selectedOption = {};
    this.radioGroupName = '';
  }

  render() {
    return html`
      <div>
        <h4>${this.label}</h4>
        ${this.options.map(
          option => html`
            <div>
              <label for="${option.value}">
                <input
                  type="radio"
                  id="${option.value}"
                  name="${this.radioGroupName}"
                  .value="${option.value}"
                  @change="${this.handleOptionChange}"
                  ?checked="${this.selectedOption.value === option.value}"
                />
                ${option.label}</label
              >
            </div>
          `
        )}
      </div>
    `;
  }

  handleOptionChange(event) {
    const newSelectOption = event.target.value;
    const selectedOptionItem = this.options.find(
      option => `${option.value}` === newSelectOption
    );

    this.selectedOption = selectedOptionItem;

    this._dispatch(`${RadioButtonGroup.is}-change`, this.selectedOption);
  }
}

customElements.define(RadioButtonGroup.is, RadioButtonGroup);
