import {
	storiesOf
} from "@storybook/vue";
import tagView from '.'
import {
	withKnobs
} from "@storybook/addon-knobs";

storiesOf("业务组件|House", module)
	.addDecorator(withKnobs)
	.add("tag 适配Android标签", () => {
		return {
			components: {
				tagView
			},
			data() {
				return {
				};
			},
			template: `<div style="width: 100%; height: 100%; position: absolute; top:50%;left:50%; ">
        <tagView message="我是标签" />
			</div>`,
		}
	})