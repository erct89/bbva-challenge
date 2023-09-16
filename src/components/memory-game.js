/* eslint-disable lit-a11y/click-events-have-key-events */
import { LitElement, html, nothing } from 'lit';

import { CommonComponentMixin } from '../mixins/common-component-mixin.js';

import './scoreboard-game.js';
import './board-game.js';
import './input-button.js';

import styles from './memory-game-styles.js';

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
      score: {
        type: Number,
      },
      packOfCards: {
        type: Array,
        attribute: 'pack-of-cards',
      },
      basePoint: {
        type: Number,
        attribute: 'base-point',
      },
      numberCardsToFind: {
        type: Object,
        attribute: 'number-cards-to-find',
      },
      _isGameStarted: {
        type: Boolean,
      },
      _showFrontCards: {
        type: Boolean,
        state: true,
      },
      _playingCardsToFind: {
        type: Array,
      },
      _selectedPlayingCards: {
        type: Array,
      },
    };
  }

  static get styles() {
    return [styles];
  }

  static shuffleArray(data = []) {
    const newData = [...data];
    const randomCompare = () => Math.round(Math.random() * 2) - 1;
    return [...newData.sort(randomCompare)];
  }

  static selectRandomValues(arr, numberOfValues) {
    if (numberOfValues >= arr.length) {
      return [...new Set(arr)];
    }

    const result = new Set();

    while (result.size < numberOfValues) {
      const valorAleatorio = arr[Math.floor(Math.random() * arr.length)];
      result.add(valorAleatorio);
    }

    return [...result];
  }

  constructor() {
    super();
    this.score = 0;
    this.basePoint = 10;
    this.currentLevel = {};
    this.packOfCards = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
    this.numberCardsToFind = {};
    this._isGameStarted = false;
    this._showFrontCards = false;
    this._playingCardsToFind = [];
    this._selectedPlayingCards = [];
  }

  get _waitingTime() {
    return this.currentLevel.value * 1000;
  }

  get _level() {
    return this.currentLevel;
  }

  get _numberCardsToFindValue() {
    return this.numberCardsToFind?.value;
  }

  get _round() {
    return (
      Math.floor(this.score / this.basePoint / this._numberCardsToFindValue) + 1
    );
  }

  get _finishedRound() {
    return this._selectedPlayingCards.length === this._numberCardsToFindValue;
  }

  get _isBoardBlocked() {
    return (
      !this._isGameStarted ||
      (this._isGameStarted && this._showFrontCards) ||
      (this._isGameStarted && this._finishedRound)
    );
  }

  _play() {
    // Start Game.
    if (!this._isGameStarted || !this._finishedRound) {
      this.score = 0;
      this._isGameStarted = true;
    }

    // Reset selected playing cards
    this._selectedPlayingCards = [];

    // Shuffle pack to cards.
    this.packOfCards = MemoryGame.shuffleArray(this.packOfCards);

    // Show cards to player
    this._showFrontCards = true;

    // Programar hidden cards.
    setTimeout(() => {
      this._playingCardsToFind = MemoryGame.selectRandomValues(
        this.packOfCards,
        this._numberCardsToFindValue
      );
      this._showFrontCards = false;
    }, this._waitingTime);
  }

  _handlePlayingCardShow(event) {
    const {
      detail: { id },
    } = event;
    this._selectedPlayingCards = [...this._selectedPlayingCards, id];

    if (this._playingCardsToFind.includes(id)) {
      this.score += this.basePoint;
    } else {
      this._isGameStarted = false;
      this._showFrontCards = true;

      window.navigator?.vibrate?.([50, 200, 50, 200]);

      this._dispatch('game-over', {
        score: this.score,
        rounds: this._round,
        level: this._level,
        cardsToFind: this.numberCardsToFind,
      });
    }
  }

  get _getAdditionalInfo() {
    return [
      { label: 'Level', value: this._level?.label },
      { label: 'Find', value: this._numberCardsToFindValue },
    ];
  }

  get _renderTracker() {
    return html`
      <div class="game-tracker">
        ${!this._isGameStarted ? html`<div>Click to Play Game</div>` : nothing}
        ${this._isGameStarted
          ? [
              this._showFrontCards
                ? html`<div>Your turn to memorize</div>`
                : nothing,
              !this._showFrontCards
                ? html`<div>
                    Where is the ${this._playingCardsToFind.join(', ')}?
                  </div>`
                : nothing,
            ]
          : []}
      </div>
    `;
  }

  get _playButtonLabel() {
    return !this._isGameStarted ? 'Play Game' : `Round ${this._round}`;
  }

  get _renderPlayButton() {
    return !this._isGameStarted || (this._isGameStarted && this._finishedRound)
      ? html`<input-button
          label="${this._playButtonLabel}"
          @click="${this._play}"
        ></input-button>`
      : nothing;
  }

  render() {
    return html`<section>
      <scoreboard-game
        score="${this.score}"
        .additionalInfo="${this._getAdditionalInfo}"
      >
      </scoreboard-game>
      ${this._renderTracker}
      <board-game
        ?is-board-blocked="${this._isBoardBlocked}"
        ?show-front-cards="${this._showFrontCards}"
        .packOfCards="${this.packOfCards}"
        .playingCardsToFind="${this._playingCardsToFind}"
        .selectedPlayingCards="${this._selectedPlayingCards}"
        @playing-card-show="${this._handlePlayingCardShow}"
      >
      </board-game>
      <div>${this._renderPlayButton}</div>
    </section>`;
  }
}

customElements.define(MemoryGame.is, MemoryGame);
