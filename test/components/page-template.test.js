import { html, fixture, expect } from '@open-wc/testing';

import '../../src/components/page-template.js';

describe('PageTemplate', () => {
  let pageTemplate;

  beforeEach(async () => {
    pageTemplate = await fixture(html`<page-template></page-template>`);
  });

  it('renders a PageTemplate with default values', () => {
    expect(pageTemplate.showFooter).to.be.false;
    expect(pageTemplate.showHeader).to.be.false;
    expect(pageTemplate.showNav).to.be.false;
    expect(pageTemplate.links).to.be.an('array').that.is.empty;
  });

  it('renders the header when showHeader is true', async () => {
    pageTemplate.showHeader = true;
    await pageTemplate.updateComplete;

    const header = pageTemplate.shadowRoot.querySelector('header');
    expect(header).to.exist;
  });

  it('renders the header when showHeader is true', async () => {
    pageTemplate.showHeader = false;
    await pageTemplate.updateComplete;

    const header = pageTemplate.shadowRoot.querySelector('header');
    expect(header).to.not.exist;
  });

  it('renders the navigation links when showNav is true', async () => {
    pageTemplate.showNav = true;
    pageTemplate.showHeader = true;
    pageTemplate.links = [
      { path: '/home', label: 'Home' },
      { path: '/about', label: 'About' },
    ];
    await pageTemplate.updateComplete;

    const nav = pageTemplate.shadowRoot.querySelector('nav');
    expect(nav).to.exist;

    const linkButtons = nav.querySelectorAll('link-button');
    expect(linkButtons.length).to.equal(2);
  });

  it('renders the footer when showFooter is true', async () => {
    pageTemplate.showFooter = true;
    await pageTemplate.updateComplete;

    const footer = pageTemplate.shadowRoot.querySelector('footer');
    expect(footer).to.exist;
  });

  it('renders the footer when showFooter is true', async () => {
    pageTemplate.showFooter = false;
    await pageTemplate.updateComplete;

    const footer = pageTemplate.shadowRoot.querySelector('footer');
    expect(footer).to.not.exist;
  });

  it('does not render the navigation links when showNav is false', async () => {
    pageTemplate.showNav = false;
    pageTemplate.links = [
      { path: '/home', label: 'Home' },
      { path: '/about', label: 'About' },
    ];
    await pageTemplate.updateComplete;

    const nav = pageTemplate.shadowRoot.querySelector('nav');
    expect(nav).to.not.exist;
  });

  it('renders the header when showHeader is true', async () => {
    pageTemplate.showHeader = true;
    await pageTemplate.updateComplete;

    const header = pageTemplate.shadowRoot.querySelector('header');
    expect(header).to.exist;
  });

  it('does not render the header when showHeader is false', async () => {
    pageTemplate.showHeader = false;
    await pageTemplate.updateComplete;

    const header = pageTemplate.shadowRoot.querySelector('header');
    expect(header).to.not.exist;
  });
});
