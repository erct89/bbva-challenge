/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import './playing-card.js';

class BoardGame extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'board-game';
  }

  static get properties() {
    return {
      backContent: {
        type: String,
        attribute: 'back-content',
      },
      isBoardBlocked: {
        type: Boolean,
        attribute: 'is-board-blocked',
      },
      packOfCards: {
        type: Array,
        attribute: 'pack-of-cards',
      },
      playingCardsToFind: {
        type: Array,
        attribute: 'playing-cards-to-find',
      },
      selectedPlayingCards: {
        type: Array,
        attribute: 'selected-playing-cards',
      },
      showFrontCards: {
        type: Boolean,
        attribute: 'show-front-cards',
      },
    };
  }

  static get styles() {
    return css`
      :host {
        --board-game-board-gap: var(--app-size--m);
        --board-game-board-width: 300px;
        --board-game-board-row-height: calc(var(--board-game-board-width) / 3);
      }
      .board {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 3 columnas de igual ancho */
        grid-template-rows: repeat(
          3,
          var(--board-game-board-row-height)
        ); /* 3 filas de 100px de alto */
        gap: var(--board-game-board-gap); /* Espacio entre las celdas */
        width: var(--board-game-board-width);
      }
    `;
  }

  constructor() {
    super();
    this.isBoardBlocked = false;
    this.packOfCards = [];
    this.playingCardsToFind = [];
    this.selectedPlayingCards = [];
    this.showFrontCards = false;
    this.backContent = '?';
  }

  _renderPlayingCard(playingCard) {
    const cardClass = classMap({
      success:
        this.selectedPlayingCards.includes(playingCard) &&
        this.playingCardsToFind.includes(playingCard),
      error:
        this.selectedPlayingCards.includes(playingCard) &&
        !this.playingCardsToFind.includes(playingCard),
    });
    return html`<playing-card
      class=${cardClass}
      ?is-front="${this.showFrontCards}"
      front-content="${playingCard}"
      back-content="${this.backContent}"
    ></playing-card>`;
  }

  _handlePlayingCardClicked(event) {
    if (this.isBoardBlocked) return;

    const { target } = event;
    target.toggleCardFace();
  }

  render() {
    return html`<div class="board" @click="${this._handlePlayingCardClicked}">
      ${this.packOfCards.map(this._renderPlayingCard.bind(this))}
    </div>`;
  }
}

customElements.define(BoardGame.is, BoardGame);
