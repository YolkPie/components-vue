import { storiesOf } from "@storybook/vue";
import YolkRadio from '.'
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|form 表单", module)
	.addDecorator(withKnobs)
	.add("单选框", () => {
		return {
			components: { YolkRadio },
			data() {
				return {
					radioInfo: [{
						title: '单选框1',
					}, {
						title: '单选框2',
					}],
				};
			},
			template: `<div style="padding: 20px">
        <YolkRadio :radioInfo="radioInfo" :isChecked="true"></YolkRadio>
			</div>`,
		}
	})
