/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html, css } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';
import './playing-card.js';

class MemoryGame extends CommonComponentMixin(LitElement) {
  static get is() {
    return 'memory-game';
  }

  static get properties() {
    return {
      currentLevel: {
        type: Object,
        attribute: 'current-level',
      },
      packOfCards: {
        type: Array,
        attribute: 'pack-of-cards',
      },
      score: {
        type: Number,
      },
    };
  }

  static get styles() {
    return css`
      .board {
        display: grid;
        grid-template-columns: repeat(3, 1fr); /* 3 columnas de igual ancho */
        grid-template-rows: repeat(3, 100px); /* 3 filas de 100px de alto */
        gap: 10px; /* Espacio entre las celdas */
        width: 300px;
      }
    `;
  }

  constructor() {
    super();
    this.currentLevel = {};
    this.packOfCards = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.score = 0;
  }

  get _level() {
    return this.currentLevel;
  }

  _handlePlayingCardClicked(event) {
    const { target } = event;
    this.score += 10;
    target.toggleCardFace();
  }

  static _renderPlayingCard(playingCard) {
    return html`<playing-card
      front-content="${playingCard}"
      back-content="?"
    ></playing-card>`;
  }

  _renderBoard() {
    return html`<div class="board" @click="${this._handlePlayingCardClicked}">
      ${this.packOfCards.map(MemoryGame._renderPlayingCard.bind(this))}
    </div>`;
  }

  _renderGameBoard() {
    return html` <section class="game">
      <div class="game-info">
        <div class="game-score">Score: ${this.score}</div>
        <div class="game-level">Level: ${this._level.label}</div>
      </div>
      <div class="game-board">${this._renderBoard()}</div>
      <div class="game-controls">
        <input type="button" value="Play Game" />
      </div>
    </section>`;
  }

  render() {
    return html` <div>${this._renderGameBoard()}</div> `;
  }
}

customElements.define(MemoryGame.is, MemoryGame);
