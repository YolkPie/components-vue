import { storiesOf } from "@storybook/vue";
import YolkBottomBtn from ".";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|button", module)
	.addDecorator(withKnobs)
	.add("底部按钮", () => {
		return {
			components: { YolkBottomBtn },
			template: ` <YolkBottomBtn :bottomFit=true>底部按钮</YolkBottomBtn>`,
		}
	})
