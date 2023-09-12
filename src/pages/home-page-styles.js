import { css } from 'lit';

export default css`
  :host {
    --home-view-fweight: var(--app-fweight--bold);
    --home-view-ffamily: var(--app-ffamily);
    --home-view-fsize: var(--app-fsize);
    --home-view-error-message-color: var(--app-color--red);
    --home-view-error-message-fsize: var(--app-fsize--m);
    --home-view-error-message-padding-bottom: var(--app-size--n);
    --home-view-link-button-margin-top: var(--app-size--n);

    font-family: var(--home-view-ffamily);
    font-weight: var(--home-view-fweight);
    font-size: var(--home-view-fsize);
  }

  page-template {
    height: 100vh;
    width: 100vw;
  }

  link-button {
    margin-top: var(--home-view-link-button-margin-top);
  }

  .error-message {
    color: var(--home-view-error-message-color);
    font-size: var(--home-view-error-message-fsize);
    padding-bottom: var(--home-view-error-message-padding-bottom);
  }
`;
