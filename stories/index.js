import { storiesOf } from '@storybook/vue';
import miVantButton from '../src/components/miVantButton/Button.vue'
import { withKnobs, text } from '@storybook/addon-knobs'


storiesOf('index', module)
  .addDecorator(withKnobs)
  .add('with text', () => {
    return {
      components: { miVantButton },
      template: `<mi-vant-button>{{text}}</mi-vant-button>`,
      props: {
        text: {
          default: text('button-text', '动态修改props传递的数据')
        }
      }
    }
  })


