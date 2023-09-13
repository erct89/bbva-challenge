import { css } from 'lit';

export default css`
  :host {
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
  h6 {
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
`;
