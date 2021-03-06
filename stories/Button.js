import { storiesOf } from '@storybook/vue';
import { withKnobs } from '@storybook/addon-knobs';
import miVantButton from '../src/components/miVantButton/Button.vue'
import { withStorySource } from '@storybook/addon-storysource'

const simpleSourceCode = '<mi-vant-button>storyBook</mi-vant-button>'
storiesOf('miVantButton', module)
  .addDecorator(withKnobs)
  .addDecorator(withStorySource(simpleSourceCode))
  .add('with text', () => {
    return {
      components: { miVantButton },
      template: `<mi-vant-button>storyBook</mi-vant-button>`,
    }
  }
)


