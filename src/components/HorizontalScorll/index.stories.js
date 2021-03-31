import {
	storiesOf
} from "@storybook/vue";
import HorizontalScorllSlot from '.'
import {
	withKnobs
} from "@storybook/addon-knobs";

storiesOf("业务组件|House", module)
	.addDecorator(withKnobs)
	.add("HorizontalScorll 无遮挡tab", () => {
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
	})