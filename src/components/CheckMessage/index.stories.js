import {
	storiesOf
} from "@storybook/vue";
import CheckBox from '.'
import {
	withKnobs
} from "@storybook/addon-knobs";

storiesOf("业务组件|House", module)
	.addDecorator(withKnobs)
	.add("CheckBox", () => {
		return {
            components: {
              CheckBox
            },
            template: `<CheckBox
            @handleChangeMessage="handleChangeMessage"
            :disable="disable"
            :selectMessageData="appraiseLabel"
          />`,
            data() {
              return {
                disable: false,
                appraiseLabel: [],
              }
            },
            methods: {
              handleChangeMessage(appraiseLabel) {
                this.appraiseLabel = appraiseLabel;
                console.log(appraiseLabel, '==appraiseLabel===')
              }
            }
		}
	})