import { storiesOf } from "@storybook/vue";
import YolkPanel from '.'
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|容器组件", module)
	.addDecorator(withKnobs)
	.add("Pannel 组件", () => {
		return {
			components: { YolkPanel },
			data() {
				return {
					title: 'Pannel标题',
				};
			},
			template: `<div style="padding: 20px">
        <YolkPanel :title="title">
          Pannel 内容
        </YolkPanel>
			</div>`,
		}
	})
