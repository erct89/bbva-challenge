import { css } from 'lit';

export default css`
  :host {
    --memory-game--gap: var(--app-size--m);
    --memory-game-tracker-fsize: var(--app-fsize--n);
    --memory-game-tracker-fweight: var(--app-fweight--bold);
    --memory-game-tracker-padding-top: var(--app-size--m);
    --memory-game-tracker-border-top: var(--app-size--s) solid
      var(--app-color--yellow);
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--memory-game--gap);
  }

  .game-tracker {
    font-size: var(--memory-game-tracker-fsize);
    font-weight: var(--memory-game-tracker-fweight);
    border-top: var(--memory-game-tracker-border-top);
    padding-top: var(--memory-game-tracker-padding-top);
    text-align: center;
    width: 100%;
  }
`;
