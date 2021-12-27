import { storiesOf } from "@storybook/vue";
import TableEmpty from './TableEmpty.vue'
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|TableEmpty", module)
	.addDecorator(withKnobs)
	.add("TableEmpty 组件", () => {
		return {
			components: { TableEmpty },
			data() {
				return {
					title: '空结果集',
					img1: require('./images/empty_notice.png'),
					img2: require('./images/empty_trace.png')
				};
			},
			template: `<div style="padding: 20px">
        <TableEmpty />
				<TableEmpty :image="img1"/>
				<TableEmpty :image="img2" message="暂无跟踪记录"/>
			</div>`,
		}
	})
