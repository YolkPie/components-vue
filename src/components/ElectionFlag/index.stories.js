import {
	storiesOf
} from "@storybook/vue";
import ElectionFlag from '.'
import {
	withKnobs
} from "@storybook/addon-knobs";

storiesOf("业务组件|House", module)
	.addDecorator(withKnobs)
	.add("腰封", () => {
		return {
			components: {
				ElectionFlag
			},
			data() {
				return {
				};
			},
			methods: {
				handleClick() {
					alert(1)
				}
			},
			template: `<div style="width: 100%; height: 100%; position: absolute; top:0;left:0; border: 1px solid black;">
        <ElectionFlag @click="handleClick" ></ElectionFlag>
			</div>`,
		}
	})