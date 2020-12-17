import {
  storiesOf
} from '@storybook/vue';
import {
  array,
  withKnobs,
  object
} from '@storybook/addon-knobs';
import HorizontalScorll from '../src/components/HorizontalScorll/HorizontalScorll.vue'
import HorizontalScorllSlot from '../src/components/HorizontalScorll/HorizontalScorllSlot.vue'

storiesOf('House', module)
  .addDecorator(withKnobs)
  .add('HorizontalScorll', () => {
    return {
      components: {
        HorizontalScorll
      },
      template: `<HorizontalScorll :rulesinfo="rulesInfo" style="width: 375px"></HorizontalScorll>`,
      props: {
        rulesInfo: {
          default: array('rulesInfo', [101, 1, 2, 3, 4, 5, 6, 7])
        },
      }
    }
  })
  .add('HorizontalScorllSlot', () => {
      return {
        components: {
          HorizontalScorllSlot
        },
        template: `<HorizontalScorllSlot @click="handleClick" style="width: 375px">
          {{contant}}
        </HorizontalScorllSlot>`,
        data() {
          return {
            contant: 0
          }
        },
        methods: {
          handleClick(index) {
            console.log(index)
            this.contant = index
          }
        }
      }
    }
  )