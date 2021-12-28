import { storiesOf } from "@storybook/vue";
import Skeleton from './index.vue'
import { withKnobs } from "@storybook/addon-knobs";

console.log('Skeleton')
storiesOf("基础组件|Skeleton", module)
	.addDecorator(withKnobs)
	.add("骨架图 组件", () => {
		return {
			components: { Skeleton },
			data() {
				return {
					
				};
			},
			template: ` <Skeleton/>`,
		}
	})
