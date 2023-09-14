import { html, fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';
import '../../src/components/radio-button-group.js';

describe('RadioButtonGroup', () => {
  let radioButtonGroup;

  beforeEach(async () => {
    radioButtonGroup = await fixture(html`
      <radio-button-group
        label="Radio Buttons"
        .options="${[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}"
        .selectedOption="${{ label: 'Option 2', value: 'option2' }}"
        radio-group-name="radio-group"
      ></radio-button-group>
    `);
  });

  it('renders the radio button group with options and a selected option', async () => {
    const radioButtons = radioButtonGroup.shadowRoot.querySelectorAll(
      'input[type="radio"]'
    );
    expect(radioButtons.length).to.equal(3);

    const selectedRadioButton =
      radioButtonGroup.shadowRoot.querySelector('input:checked');
    expect(selectedRadioButton).to.exist;
    expect(selectedRadioButton.value).to.equal('option2');
  });

  it('dispatches a change event when a radio button is selected', async () => {
    const changeSpy = sinon.spy();
    radioButtonGroup.addEventListener('radio-button-group-change', changeSpy);

    const radioButtons = radioButtonGroup.shadowRoot.querySelectorAll(
      'input[type="radio"]'
    );
    radioButtons[0].click();

    expect(changeSpy.calledOnce).to.be.true;
    expect(changeSpy.firstCall.args[0].detail.value).to.equal('option1');
  });

  it('updates the selectedOption property when a radio button is selected', async () => {
    const radioButtons = radioButtonGroup.shadowRoot.querySelectorAll(
      'input[type="radio"]'
    );
    radioButtons[0].click();

    expect(radioButtonGroup.selectedOption.value).to.equal('option1');
  });
});
