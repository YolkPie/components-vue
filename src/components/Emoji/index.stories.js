import {
	storiesOf
} from "@storybook/vue";
import Emoji from '.'
import {
	withKnobs
} from "@storybook/addon-knobs";

storiesOf("业务组件|House", module)
	.addDecorator(withKnobs)
	.add("Emoji", () => {
		return {
            components: {
              Emoji
            },
            template: `<Emoji
            @handleChangeEmoji="handleChangeEmoji"
            :disable="disable"
            :selectIndex="selectIndex"
          />`,
            data() {
              return {
                cardinfo: {
                  "selectIndex": "1",
                  "disable": false,
                }
              }
            },
            methods: {
              handleChangeEmoji(index) {
                console.log('Click Me', index)
              }
            }
		}
	})