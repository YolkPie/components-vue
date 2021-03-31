import {
	storiesOf
} from "@storybook/vue";
import Empty from '.'
import {
	withKnobs
} from "@storybook/addon-knobs";

storiesOf("业务组件|House", module)
	.addDecorator(withKnobs)
	.add("Empty 空状态", () => {
		return {
			components: {
				Empty
			},
			data() {
				return {
					styleMessage: {
						height: '200',
						width: '400'
					}
				};
			},
			template: `<div style="width: 100%; height: 100%; position: absolute; top:0;left:0; border: 1px solid black;">
        <Empty errorMessage="描述文字">
			<button>返回</button>
		</Empty>
			</div>`,
		}
	})