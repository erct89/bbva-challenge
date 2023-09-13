import { LitElement, html, css, nothing } from 'lit';

class ScoreboardGame extends LitElement {
  static get is() {
    return 'scoreboard-game';
  }

  static get properties() {
    return {
      score: { type: Number },
      additionalInfo: { type: Array, attribute: 'additional-info' },
    };
  }

  static get styles() {
    return css`
      :host {
        --scoreboard-ffamily: var(--app-ffamily);

        --scoreboard-score-label-fsize: var(--app-fsize--m);

        --scoreboard-score-value-fsize: var(--app-fsize--3xl);
        --scoreboard-score-value-fweight: var(--app-fweight--bold);

        --scoreboard-additional-fsize: var(--app-fsize--n);
        --scoreboard-additional-header-margin: var(--app-size--zero-px);
        --scoreboard-additional-header-fsize: var(--app-fsize--m);
        --scoreboard-additional-padding-tb: var(--app-size--m);
        --scoreboard-additional-padding-lr: var(--app-size--s);
        --scoreboard-score-padding-tb: var(--app-size--m);
        --scoreboard-score-padding-lr: var(--app-size--s);

        font-family: var(--scoreboard-ffamily);
        width: 100%;
      }

      h6 {
        margin: var(--scoreboard-additional-header-margin);
        font-size: var(--scoreboard-additional-header-fsize);
      }

      .scoreboard {
        display: flex;
        justify-content: space-between;
      }

      .score {
        display: flex;
        flex-direction: column;
        align-content: center;
        justify-content: center;
        width: 100%;
        padding: var(--scoreboard-score-padding-tb)
          var(--scoreboard-score-padding-lr);

        & .score-label {
          font-size: var(--scoreboard-score-label-fsize);
        }

        & .score-value {
          font-size: var(--scoreboard-score-value-fsize);
          font-weight: var(--scoreboard-score-value-fweight);
          align-self: center;
        }
      }

      .additional {
        display: flex;
        flex-direction: column;
        justify-content: end;
        width: 100%;
        height: 100%;
        font-size: var(--scoreboard-additional-fsize);
        padding: var(--scoreboard-additional-padding-tb)
          var(--scoreboard-additional-padding-lr);
      }
    `;
  }

  constructor() {
    super();
    this.score = 0;
    this.additionalData = [];
  }

  get _showAdditional() {
    return Array.isArray(this.additionalInfo) && !!this.additionalInfo.length;
  }

  static _renderAdditional({ label, value }) {
    return html`<div><span>${label}: </span><span>${value}</span></div>`;
  }

  get _renderAdditionalInfo() {
    return this._showAdditional
      ? html`<div class="additional">
          <h6>Additional Info</h6>
          ${this.additionalInfo.map(ScoreboardGame._renderAdditional)}
        </div>`
      : nothing;
  }

  render() {
    return html`<div class="scoreboard">
      <div class="score">
        <h6 class="score-label">Score</h6>
        <div class="score-value">${this.score}</div>
      </div>
      ${this._renderAdditionalInfo}
    </div>`;
  }
}

customElements.define(ScoreboardGame.is, ScoreboardGame);
