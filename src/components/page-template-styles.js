import { css } from 'lit';

export default css`
  :host {
    --page-template-ffamily: var(--app-ffamily, sans-serif);
    --page-template-ffsize: var(--app-fsize--n, 1rem);

    --page-template-bg: var(--app-bg, white);
    --page-template-color: var(--app-color, black);

    --page-template-nav-bg: var(--app-bg--three, gray);
    --page-template-nav-color: var(--app-color--three, black);
    --page-template-nav-padding: var(--app-size--m);

    --page-template-header-bg: var(--app-bg--second);
    --page-template-header-color: var(--app-color);
    --page-template-header-ffsize: var(--app-fsize--xl);
    --page-template-header-padding: var(--app-size--m);
    --page-template-header-center-text-shados-color: var(--app-color--white);

    --page-template-main-padding: var(--app-size--l);
    --page-template-footer-padding: var(--app-size--m);

    display: flex;
    flex-direction: column;
    font-family: var(--page-template-ffamily);
    font-size: var(--page-template-ffsize);
    background-color: var(--page-template-bg);
    color: var(--page-template-color);
  }

  header {
    position: sticky;
    top: 0;
  }

  .header {
    display: flex;
    font-size: var(--page-template-header-ffsize);
    background-color: var(--page-template-header-bg);
    color: var(--page-template-header-color);
    text-align: center;
    padding: var(--page-template-header-padding);
  }

  .header-center,
  .header-left,
  .header-right {
    padding: var(--page-template-header-padding);
  }

  .header-center {
    flex-grow: 1;
  }

  nav {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--page-template-nav-color);
    background-color: var(--page-template-nav-bg);
    padding: var(--page-template-nav-padding);
    justify-content: space-between;
  }

  main {
    padding: var(--page-template-main-padding);
  }

  footer {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 0;
    padding: var(--page-template-footer-padding);
  }
`;
