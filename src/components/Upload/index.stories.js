import { storiesOf } from "@storybook/vue";
import YolkUpload from '.'
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|Upload", module)
	.addDecorator(withKnobs)
	.add("Upload 组件", () => {
		return {
			components: { YolkUpload },
			data() {
				return {
					title: 'Upload',
				};
			},
			template: `<div style="padding: 20px">
        <YolkUpload >
         
        </YolkUpload>
			</div>`,
		}
	})
