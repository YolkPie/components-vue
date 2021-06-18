import { storiesOf } from "@storybook/vue";
import UEditor from ".";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|UEditor", module)
	.addDecorator(withKnobs)
	.add("UEditor", () => {
		return {
			components: { UEditor },
      data() {
				return {
					content:''
				};
			},
      template: `
				<UEditor ref="refUEditor" 
				:content="content" 
				@blur="onContentBlur" width="620" height="360"/>
        `,
			mounted(){
				this.content = '测试内容'
			},
			methods:{
				onContentBlur(){
					this.content = this.$refs.refUEditor.getContent()
					alert(this.content)
				}
			}
		}
	})
