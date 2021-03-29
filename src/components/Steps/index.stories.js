import { storiesOf } from "@storybook/vue";
import YolkSteps from ".";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|Steps", module)
	.addDecorator(withKnobs)
	.add("Steps", () => {
		return {
			components: { YolkSteps },
      data() {
				return {
					steps: ['步骤1', '步骤2', '完成'],
				};
			},
      template: `
        <YolkSteps :text="steps" :activeStatu="1"></YolkSteps>
        `,
		}
	})
