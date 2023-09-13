import { css } from 'lit';

export default css`
  :host {
    --scores-list-font-family: var(--app-ffamily);
    --scores-list-background: var(--app-bg);
    --scores-list-text-color: var(--app-color);
    --scores-list-header-font-size: var(--app-fsize--n);
    --scores-list-header-background: var(--app-bg--second);
    --scores-list-header-link-color: var(--app-color);
    --scores-list-empty-message-font-size: var(--app-fsize--n);
    --scores-list-empty-message-color: var(--app-color);
    --scores-list-header-margin-top: var(--app-size--s);
    --scores-list-header-margin-bottom: var(--app-size--m);
    --scores-list-item-margin-top: var(--app-size--m);

    display: block;
    font-family: var(--scores-list-font-family);
    background-color: var(--scores-list-background);
    color: var(--scores-list-text-color);
  }

  h4 {
    margin-top: var(--scores-list-header-margin-top);
    margin-bottom: var(--scores-list-header-margin-bottom);
  }

  score-card {
    margin-top: var(--scores-list-item-margin-top);
    margin-bottom: var(--scores-list-item-margin-top);
  }
`;
