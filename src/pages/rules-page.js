import { LitElement, html, css } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

class RulesPage extends CommonComponentMixin(LitElement) {
  static get is() {
    return `rules-page`;
  }

  static get styles() {
    return css``;
  }

  render() {
    return html` <section>
      <div>
        <div>
          <h4>Description</h4>
          <p>
            Check your memorization speed by discovering the card's position.
            You have different difficulty options and a score record.
          </p>
          <h4>Rules</h4>
          <ol>
            <li>Press the start button.</li>
            <li>
              Depending on the selected difficulty level, you will see the
              placement of the 9 cards.
            </li>
            <li>
              Once the time is up and the cards are face down, you will be asked
              to guess the position of a card.
            </li>
            <li>
              If you guess correctly, the card will turn green, add 10 points,
              and another round will begin.
            </li>
            <li>The game ends when you fail to guess the card's position.</li>
          </ol>
        </div>
      </div>
    </section>`;
  }
}

customElements.define(RulesPage.is, RulesPage);
