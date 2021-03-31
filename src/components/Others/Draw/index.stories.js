import {
	storiesOf
} from "@storybook/vue";
import Draw from '.'
import {
	withKnobs
} from "@storybook/addon-knobs";

storiesOf("基础组件|Others", module)
	.addDecorator(withKnobs)
	.add("Draw 画布", () => {
		return {
			components: {
				Draw
			},
			data() {
				return {
					styleMessage: {
						height: '200',
						width: '400'
					}
				};
			},
			template: `<div >
        <Draw :styleMessage="styleMessage"></Draw>
			</div>`,
		}
	})