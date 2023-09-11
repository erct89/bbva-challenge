import { html } from 'lit';
import '../src/bbva-challenge.js';

export default {
  title: 'BbvaChallenge',
  component: 'bbva-challenge',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <bbva-challenge
      style="--bbva-challenge-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </bbva-challenge>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
