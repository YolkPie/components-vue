import { storiesOf } from "@storybook/vue";
import AuthTree from ".";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Element扩展|AuthTree", module)
	.addDecorator(withKnobs)
	.add("权限分配树", () => {
		return {
			components: { AuthTree },
      data() {
				return {
					authTreeData: [
            {id:1,label:"父菜单1", isLeaf: true, actions:[{ id: 121, label: "发布1", checked: false}, { id: 131, label: "发布2", checked: false}, { id: 141, label: "发布4", checked: false}]},
            {id:2,label:"父菜单2", isLeaf: true, actions:[{ id: 221, label: "发布1", checked: false}, { id: 232, label: "发布2", checked: false}, { id: 242, label: "发布4", checked: false}]},
            {id:3,label:"父菜单3", isLeaf: false, children:[
              { id: 321, label: "子菜单1", isLeaf: false, 
                children:[
                  { id: 3211, label: "子菜单11", isLeaf: false,
                    actions:[{ id: 32111, label: "发布1", checked: false}, { id: 32112, label: "发布2", checked: false}, { id: 32113, label: "发布4", checked: false}], 
                  }, 
                  { id: 132, label: "子菜单12", isLeaf: false}, 
                  { id: 142, label: "子菜单13", isLeaf: false}],
                actions:[{ id: 1421, label: "发布1", checked: false}, { id: 1422, label: "发布2", checked: false}, { id: 1423, label: "发布4", checked: false}], 
              }, 
              { id: 322, label: "子菜单2", isLeaf: false}, 
              { id: 323, label: "子菜单3", checked: false}]}
          ],
          checkedKeys:[1, 321, 322]
        };
			},
      template: `
        <div style="padding: 1rem;">
          <AuthTree
            ref="refAuthTree"
            :readonly="false"
            :checkedKeys="checkedKeys"
          ></AuthTree>
          
          <button style="font-size:.24rem; margin-top:1rem;" @click="getCheckedKeys">获取选中节点</button>
        </div>
        `,
      mounted(){
        this.$refs.refAuthTree.setData(this.authTreeData)
      },
      methods:{
        getCheckedKeys(){
          let keys = this.$refs.refAuthTree.getCheckedKeys()
          alert(keys)
        }
      }
		}
	})
