import { html, fixture, expect, elementUpdated } from '@open-wc/testing';
import sinon from 'sinon';
import '../../src/pages/config-page.js';

describe('ConfigPage', () => {
  let configPage;

  beforeEach(async () => {
    configPage = await fixture(html`<config-page></config-page>`);
  });

  it('renders two RadioButtonGroup components', () => {
    const radioGroups =
      configPage.shadowRoot.querySelectorAll('radio-button-group');
    expect(radioGroups.length).to.equal(2);
  });

  it('handles RadioButtonGroup change events and dispatches "configs-change"', async () => {
    const radioGroup1 = configPage.shadowRoot.querySelector(
      '[radio-group-name="level"]'
    );
    const radioGroup2 = configPage.shadowRoot.querySelector(
      '[radio-group-name="numberCardsToFind"]'
    );
    const dispatchSpy = sinon.spy(configPage, '_dispatch');

    // Simular un cambio en el primer RadioButtonGroup
    radioGroup1.dispatchEvent(
      new CustomEvent('radio-button-group-change', {
        detail: { value: 'Intermediate' }, // Cambiar el valor seleccionado según tus necesidades
        bubbles: true,
        composed: true,
      })
    );

    await elementUpdated(configPage);

    // Asegurarse de que se maneje el cambio y se haya despachado el evento
    expect(configPage.currentLevel).to.deep.equal({ value: 'Intermediate' });
    expect(dispatchSpy.calledOnce).to.be.true;
    expect(
      dispatchSpy.calledWith(
        'configs-change',
        sinon.match({ level: { value: 'Intermediate' } })
      )
    ).to.be.true;

    // Simular un cambio en el segundo RadioButtonGroup
    radioGroup2.dispatchEvent(
      new CustomEvent('radio-button-group-change', {
        detail: { value: 10 }, // Cambiar el valor seleccionado según tus necesidades
        bubbles: true,
        composed: true,
      })
    );

    await elementUpdated(configPage);

    // Asegurarse de que se maneje el cambio y se haya despachado el evento
    expect(configPage.currentNumberCardsToFind).to.deep.equal({ value: 10 });
    expect(dispatchSpy.calledTwice).to.be.true;
    expect(
      dispatchSpy.calledWith(
        'configs-change',
        sinon.match({ numberCardsToFind: { value: 10 } })
      )
    ).to.be.true;
  });
});
