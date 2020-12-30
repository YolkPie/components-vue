import { storiesOf } from "@storybook/vue";
import YolkDivider from '.'
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|Others", module)
	.addDecorator(withKnobs)
	.add("Divider 分割线", () => {
		return {
			components: { YolkDivider },
			data() {
				return {
					content: ['深支子', '丁子染', '樱花抄'],
				};
			},
			template: `<div style="padding: 20px">
        <YolkDivider :content="content"></YolkDivider>
			</div>`,
		}
	})
