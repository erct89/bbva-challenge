/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html, nothing } from 'lit';
import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import styles from './score-card-styles.js';

class ScoreCard extends CommonComponentMixin(LitElement) {
  static get is() {
    return `score-card`;
  }

  static get properties() {
    return {
      additionalInformation: {
        type: Array,
        attribute: 'additional-information',
      },
      rankingPosition: {
        type: Number,
        attribute: 'ranking-position',
      },
      score: {
        type: Number,
      },
      showInfo: {
        type: Boolean,
        attribute: 'show-info',
      },
      userName: {
        type: String,
        attribute: 'user-name',
      },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.userName = '';
    this.score = 0;
    this.rankingPosition = 0;
    this.additionalInformation = [];
    this.showInfo = false;
  }

  static _renderKeyValueInfo({ key, value, position }) {
    const tplPosition = position
      ? html`<div class="position"><span>#${position}</span></div>`
      : nothing;

    return html`
      ${tplPosition}
      <div class="key">
        <span>${key}</span>
      </div>
      <div class="value">
        <span>${value}</span>
      </div>
    `;
  }

  get _renderAdditionalInformation() {
    return this.showInfo
      ? html`<div class="info info__additional">
          ${this.additionalInformation.map(
            addInfo =>
              html`<div>${ScoreCard._renderKeyValueInfo(addInfo)}</div>`
          )}
        </div>`
      : nothing;
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;
  }

  render() {
    return html`
      <div @click="${this.toggleInfo}">
        <div class="info info__basic">
          ${ScoreCard._renderKeyValueInfo({
            position: this.rankingPosition,
            key: this.userName,
            value: this.score,
          })}
        </div>
        ${this._renderAdditionalInformation}
      </div>
    `;
  }
}

customElements.define(ScoreCard.is, ScoreCard);
