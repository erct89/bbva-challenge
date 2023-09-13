import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import sinon from 'sinon';

import '../../src/components/playing-card.js';

describe('PlayingCard', () => {
  let element;
  let rootElement;

  beforeEach(async () => {
    element = await fixture(html`<playing-card></playing-card>`);
    rootElement = element.shadowRoot.querySelector('div.card');
  });

  it('should render the front content by default', () => {
    expect(element.shadowRoot.querySelector('.card.flipped')).to.exist;
  });

  it('should toggle card face on click if autoFlipped is true', async () => {
    element.autoFlipped = true;
    rootElement.click();
    await elementUpdated(element);

    expect(element.shadowRoot.querySelector('.card.flipped')).to.not.exist;
  });

  it('should not toggle card face on click if autoFlipped is false', async () => {
    element.autoFlipped = false;
    rootElement.click();
    await elementUpdated(element);

    expect(element.shadowRoot.querySelector('.card.flipped')).to.exist;
  });

  it('should dispatch playing-card-toggle event when toggling card face', async () => {
    const eventSpy = sinon.spy();
    element.autoFlipped = true;
    element.addEventListener('playing-card-toggle', eventSpy);

    rootElement.click();
    await elementUpdated(element);

    expect(eventSpy.calledOnce).to.be.true;
    expect(eventSpy.firstCall.args[0].detail.isFront).to.be.true;
  });

  it('should dispatch playing-card-show event when showing the front face', async () => {
    const eventSpy = sinon.spy();
    element.addEventListener('playing-card-show', eventSpy);

    element.autoFlipped = true;
    rootElement.click();
    await elementUpdated(element);

    expect(eventSpy.calledOnce).to.be.true;
    expect(eventSpy.firstCall.args[0].detail.id).to.equal(element.frontContent);
  });

  it('should toggle card face when calling toggleCardFace method', async () => {
    const eventSpy = sinon.spy();
    element.addEventListener('playing-card-toggle', eventSpy);

    expect(element.isFront).to.be.false;

    element.toggleCardFace();
    expect(eventSpy.calledOnce).to.be.true;
    expect(eventSpy.firstCall.args[0].detail.isFront).to.be.true;
  });

  it('should toggle card face on click if autoFlipped is true', async () => {
    const eventSpy = sinon.spy();
    element.addEventListener('playing-card-toggle', eventSpy);

    element.isFront = false;
    expect(element.isFront).to.be.false;

    element.autoFlipped = true;

    rootElement.click();
    expect(eventSpy.calledOnce).to.be.true;
    expect(eventSpy.firstCall.args[0].detail.isFront).to.be.true;
  });

  it('should not toggle card face on click if autoFlipped is false', async () => {
    element.isFront = true;
    expect(element.isFront).to.be.true;

    element.autoFlipped = false;

    rootElement.click();

    await new Promise(resolve => {
      setTimeout(resolve, 100);
    });

    expect(element.isFront).to.be.true;
  });
});
