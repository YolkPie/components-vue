import { storiesOf } from "@storybook/vue";
import MenuTree from "./MenuTree.vue";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Element扩展|MenuTree", module)
	.addDecorator(withKnobs)
	.add("MenuTree", () => {
		return {
			components: { MenuTree },
      data() {
				return {
					activeRoute:'/',
					curMenu:{id: 1, menuUrl:'/level1/child1'},
					menuData : [
						{"id":1,"menuName":"首页","menuUrl":"/dashboard","icon":"dashboard","parent":true,"pid":"-1"},
						{"id":2,"menuName":"一级分类","menuUrl":"/level1","icon":"notice","parent":true,"pid":"-1","children":[
							{"id":3,"menuName":"二级分类","menuUrl":"/level1/child1","icon":"role","parent":false,"pid":"83980","children":""},
						]}
					]
				};
			},
      template: `
				<div style="margin: 10px 20px;width: 220px;height:550px; background:linear-gradient(#3C4978, #2d3450);">
					<el-menu router
						text-color="#ccc"
						:default-active='activeRoute'
						active-text-color="#fff">
						<MenuTree :menuData="menuData" :curMenu="curMenu"></MenuTree>
					</el-menu>
				</div>`,
			mounted(){
			},
			methods:{
				
			}
		}
	})
