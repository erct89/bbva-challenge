import { LitElement, html, css } from 'lit';
import { CommonComponentMixin } from '../mixins/common-component-mixin.js';
import { PageComponentMixin } from '../mixins/page-component-mixin.js';

import '../components/score-card.js';
import '../components/scores-list.js';
import '../components/link-button.js';

export class ScoresPage extends PageComponentMixin(
  CommonComponentMixin(LitElement)
) {
  static get is() {
    return 'scores-page';
  }

  static get properties() {
    return {};
  }

  static get styles() {
    return css``;
  }

  constructor() {
    super();
    this.config = {
      scores: [],
      scoresHeader: 'Global Hight Scores',
      userScores: [],
      userScoresHeader: 'My Hight Scores',
      emptyMessage: 'Yeah!! You are the first!!',
    };
  }

  get scores() {
    return this.config?.scores;
  }

  get userScores() {
    return this.config?.userScores;
  }

  get emptyMessage() {
    return this.config?.emptyMessage;
  }

  get userScoresHeader() {
    return this.config?.userScoresHeader;
  }

  get scoresHeader() {
    return this.config?.scoresHeader;
  }

  render() {
    return html`
      <section>
        <main>
          <score-list
            header-title="${this.userScoresHeader}"
            empty-message="${this.emptyMessage}"
            .scores="${this.userScores}"
          ></score-list>
          <score-list
            header-title="${this.scoresHeader}"
            empty-message="${this.emptyMessage}"
            .scores="${this.scores}"
          ></score-list>
        </main>
      </section>
    `;
  }
}

customElements.define(ScoresPage.is, ScoresPage);
