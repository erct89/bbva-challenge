import { css } from 'lit';

export default css`
  :host {
    --app-page-notify-padding: var(--app-size--m);
    --app-page-notify-ffamily: var(--app-ffamily);
    --app-page-notify-fsize: var(--app-fsize--m);
    --app-page-notify-color: var(--app-color--three);
    --app-page-notify-bg: var(--app-bg--success);

    display: block;
    min-height: 100vh;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    font-family: var(--app-ffamily);
    font-weight: var(--app-fweight);
    font-size: var(--app-fsize--n);
    color: var(--app-color);
    margin: var(--app-size--zero) auto;
    background-color: var(--app-bg);
    height: 100vh;
    width: 100vw;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6, p {
    margin: var(--app-size--zero-px);
    padding: var(--app-size--zero-px);
  }

  main {
    flex-grow: 1;
  }

  .content {
    width: 100%;
    height: 100%;
  }

  .content--center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .notify-show {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--app-page-notify-padding);
    font-family: var(--app-page-notify-ffamily);
    font-size: var(--app-page-notify-fsize);
    color: var(--app-page-notify-color);
    background-color: var(--app-page-notify-bg);
    pointer-events: none;
  }
`;
