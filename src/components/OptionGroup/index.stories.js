import { storiesOf } from "@storybook/vue";
import OptionGroup from './OptionGroup.vue'
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|GroupOption", module)
	.addDecorator(withKnobs)
	.add("选择-群组组件", () => {
		return {
			components: { OptionGroup },
			data() {
				return {
					selected: 5
				};
			},
			methods: {
				chooseItem(selected) {
					this.selected = selected
				}
			},
			template: `
				<OptionGroup
				title="标题"
				:values="[{
					  label: '升价拍',
					  value: 5
					},
					{
					  label: '降价拍',
					  value: 14
					},
					{
					  label: '一口价',
					  value: 9
					}
				]"
				:selectedValue="selected"
				@chooseOption="(selected) => chooseItem(selected)"/>
			`,
		}
	})
