import { storiesOf } from '@storybook/vue';
import productItem from '../src/components/ProductItem/ProductItem.vue'
import { withKnobs } from '@storybook/addon-knobs'


storiesOf('productItem', module)
  .addDecorator(withKnobs)
  .add('商品组件', () => {
    return {
      components: { productItem },
      template: `<product-item></product-item>`
    }
  })


