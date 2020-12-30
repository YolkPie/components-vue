import { storiesOf } from "@storybook/vue";
import YolkSelectBox from ".";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|form 表单", module)
	.addDecorator(withKnobs)
	.add("选择框", () => {
		return {
			components: { YolkSelectBox },
			template: ` <div style="padding: 20px">
				<YolkSelectBox
        :selected="true" :disabled="false"
      >选择框1</YolkSelectBox>
			</div>`,
		}
	})
