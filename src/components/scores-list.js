import { LitElement, html } from 'lit';
import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import styles from './scores-list-styles.js';

class ScoreList extends CommonComponentMixin(LitElement) {
  static get is() {
    return `score-list`;
  }

  static get properties() {
    return {
      headerTitle: {
        type: String,
        attribute: 'header-title',
      },
      emptyMessage: {
        type: String,
        attribute: 'empty-message',
      },
      scores: {
        type: Array,
      },
    };
  }

  static get styles() {
    return [styles];
  }

  constructor() {
    super();
    this.emptyMessage = '';
    this.headerTitle = '';
    this.scores = [];
  }

  static _tplScoreInfo({ name, score, ...rest }, index) {
    const position = index + 1;
    const additionalInfo = [
      { key: 'Level', value: rest.level?.label },
      { key: 'Round', value: rest.rounds },
      { key: 'Cards to Find', value: rest.cardsToFind?.value },
    ];

    return html`
      <score-card
        ranking-position="${position}"
        user-name="${name}"
        score="${score}"
        .additionalInformation="${additionalInfo}"
      ></score-card>
    `;
  }

  get _hasScores() {
    return this.scores?.length > 0;
  }

  render() {
    const items = this._hasScores
      ? this.scores.map(ScoreList._tplScoreInfo)
      : html`<p>${this.emptyMessage}</p>`;

    return html`
      <section>
        <h4>${this.headerTitle}</h4>
        <div>${items}</div>
      </section>
    `;
  }
}

customElements.define(ScoreList.is, ScoreList);
