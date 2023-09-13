import { LitElement, html, css } from 'lit';
import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import '../components/score-card.js';
import '../components/scores-list.js';
import '../components/link-button.js';

class ScoresPage extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'scores-page';
  }

  static get properties() {
    return {
      scores: {
        type: Array,
        attribute: 'scores',
      },
      userScores: {
        type: Array,
        attribute: 'user-scores',
      },
      emptyMessage: {
        type: String,
        attribute: 'empty-message',
      },
    };
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.emptyMessage = 'Yeah!! You are the first!!';
    this.scores = [];
  }

  render() {
    return html`
      <section>
        <main>
          <score-list
            header-title="My Hight Scores"
            empty-message="${this.emptyMessage}"
            .scores="${this.userScores}"
          ></score-list>
          <score-list
            header-title="Global Hight Scores"
            empty-message="${this.emptyMessage}"
            .scores="${this.scores}"
          ></score-list>
        </main>
      </section>
    `;
  }
}

customElements.define(ScoresPage.is, ScoresPage);
