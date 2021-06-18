<template>
  <div class="yp-auth-tree" :class="commonStyle">
    <el-tree
      ref='refAuthTree'
      node-key="id"
      :data="authTreeData"
      :disabled="readonly"
      :default-expand-all="readonly ? true : false"
      :default-expanded-keys="[-1]"
      show-checkbox
      @check="onCheckNode">
      <div class="yp-custom-node" :class="{hidden: data.hidden}" slot-scope="{ data }">
          {{ data.label }}
          <!-- v-if="data.isLeaf" -->
          <div class="yp-action-node" v-if="data.actions && data.actions.length">
            <el-checkbox v-for="action in data.actions" 
              :key="action.id" 
              :disabled="action.disabled"
              v-show="!action.hidden"
              v-model="action.checked"
              @change="onActionChange(data)">{{ action.label }}</el-checkbox>
          </div>
      </div>
  </el-tree>
  </div>
</template>

<script>
export default {
  name: "authTree",
  data() {
    return {
      isCheckAll: false,
      authTreeData:[],
      checkedData:[]
    };
  },
  props: {
    commonStyle:{
      type: String,
      default: ''
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    checkedAll:{
      type: Boolean,
      default: false,
    },
    checkedKeys: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    checkedKeys(newVal) {
      if(!newVal || !newVal.length) return
      this.$refs.refAuthTree.setCheckedKeys(newVal)
      this.setActionKeys(this.authTreeData, true, newVal)
    },
  },
  created(){
    // this.getAuthTreeData()
  },
  methods: {
    getAuthTreeData(){
      // this.authTreeData = [
      //   { 
      //     id: -1, label: "全选", isLeaf: false,disabled: this.readonly,
      //     children: [
      //       {id: -2, label: '隐藏节点', isLeaf: false, disabled: false, hidden: true},
      //       {id:179,label:"遴选人公告", isLeaf: true, actions:[{ id: 121, label: "发布1", checked: false}, { id: 131, label: "发布2", checked: false}, { id: 141, label: "发布4", checked: false}]},
      //       {id:180,label:"投资人招募", isLeaf: true, actions:[{ id: 122, label: "发布1", checked: false}, { id: 132, label: "发布2", checked: false}, { id: 142, label: "发布4", checked: false}]},
      //       {id:181,label:"标的监管", isLeaf: false, children:[
      //         { id: 123, label: "子菜单1", isLeaf: false, 
      //           children:[
      //             { id: 122, label: "子菜单11", isLeaf: false,
      //               actions:[{ id: 122, label: "发布1", checked: true}, { id: 132, label: "发布2", checked: false}, { id: 142, label: "发布4", checked: false}], 
      //             }, 
      //             { id: 132, label: "子菜单12", isLeaf: false}, 
      //             { id: 142, label: "子菜单13", isLeaf: false}],
      //           actions:[{ id: 122, label: "发布1", checked: false}, { id: 132, label: "发布2", checked: false}, { id: 142, label: "发布4", checked: false}], 
      //         }, 
      //         { id: 133, label: "子菜单2", isLeaf: false}, 
      //         { id: 143, label: "子菜单3", true: false}]}
      //     ]}
      //   ]
      // this.$nextTick(() => {
      //   // 增加一个隐藏节点，实现actions 取消选中时，全选半选中状态
      //   let hiddenNode = document.querySelector('.hidden')
      //   hiddenNode.parentNode.parentNode.style.display = 'none'
      // })
      // return
      if(!this.roleId){
        console.log('roleId is empty!')
        return
      }
      this.$axios.getMenuByRoleId({ roleId: this.roleId }).then(res => {
        if(!res.data) return
        if(!this.readonly){
          let children = this.formatMenuData(res.data)
          this.authTreeData = [
            { id: -1, label: "全选", isLeaf: false,disabled: false,
              children: [
                {id: -2, label: '隐藏节点', isLeaf: true, disabled: false, hidden: true},
                ...children
              ]
            }]
          this.$nextTick(() => {
            // 增加一个隐藏节点，实现actions 取消选中时，全选半选中状态
            let hiddenNode = document.querySelector('.hidden')
            hiddenNode.parentNode.parentNode.style.display = 'none'
          })
          return;
        }
        this.authTreeData = this.formatMenuData(res.data)
        this.$nextTick(() => {
          if(this.checkedAll){
            this.$refs.refAuthTree.setCheckedNodes(this.authTreeData);
            this.setActionKeys(this.authTreeData, true)
          }
        })
      }).catch(err => {
        this.$message.error(err.message || '获取权限配置失败')
      })
    },
    formatMenuData(menuList){
      if(!menuList || !menuList.length){
        return []
      }
      let menuData = [];
      for(let i = 0; i < menuList.length; i++){
        let menu = menuList[i]
        if(!menu.sonMenuList || !menu.sonMenuList.length){
          menuData.push({ 
            id: menu.id, 
            label: menu.menuName, 
            isLeaf: true, 
            disabled: this.readonly 
          })
          continue
        }
        let actions = [], children = []
        menu.sonMenuList.forEach(item => {
          if(item.menuType === 1){ // menuType： 1:子菜单 2:操作权限
            let sonMenuList = item.sonMenuList || []
            let childMenus = sonMenuList.filter(son => son.menuType === 1)
            let actions = sonMenuList.filter(son => son.menuType === 2)
                          .map(son => ({
                              id: son.id, 
                              label: son.menuName, 
                              disabled: this.readonly,
                              checked: this.checkedKeys.includes(son.id) 
                            }))
            // 与后台约定，actions第一个查询操作要与菜单权限同步,前端直接隐藏
            actions[0].disabled = true
            actions[0].hidden = true
            children.push({
              id: item.id, 
              label: item.menuName,
              isLeaf: !childMenus.length,
              disabled: this.readonly,
              actions,
              children: this.formatMenuData(childMenus)
            })
          } else {
            actions.push({ 
              id: item.id, 
              label: item.menuName,
              disabled: this.readonly,
              checked: this.checkedKeys.includes(item.id) })
          }
        })

        // 与后台约定，actions第一个查询操作要与菜单权限同步
        actions[0].disabled = true
        actions[0].hidden = true
        menuData.push({ 
          id: menu.id, 
          label: menu.menuName, 
          children,
          actions,
          isLeaf: false,
          disabled: this.readonly
        })
      }
      return menuData
    },

    setData(treeData){
      if(!treeData || !treeData.length){
        return
      }
      let tmpData = [
        {id: -1, label: "全选", isLeaf: false,disabled: this.readonly,
          children: [
            {id: -2, label: '隐藏节点', isLeaf: false, disabled: false, hidden: true},
          ]
        }
      ]
      if(this.readonly){
       this.updateNodeStauts(treeData)
      }
      tmpData[0].children = tmpData[0].children.concat(treeData)
      this.authTreeData = tmpData

      this.$nextTick(() => {
        // 增加一个隐藏节点，实现actions 取消选中时，全选半选中状态
        let hiddenNodes = document.querySelectorAll('.hidden')
        for(let i = 0; i < hiddenNodes.length; i++){
          hiddenNodes[i].parentNode.parentNode.style.display = 'none'
        }
      })

      this.$refs.refAuthTree.setCheckedKeys(this.checkedKeys)
      this.setActionKeys(this.authTreeData, true, this.checkedKeys)
    },
    updateNodeStauts(treeData){
      treeData.forEach(item => {
        item.disabled = this.readonly
        if(item.children && item.children.length){
          this.updateNodeStauts(item.children)
        }
      })
    },
    onCheckNode(data, { checkedKeys }){
      let checked = checkedKeys.includes(data.id)
      if(data.id === -1){ // 全选功能
        this.setActionKeys(this.authTreeData, checked)
        return; 
      }
      // 如果有操作配置，第一个默认为查询(与后台约定好的),
      // 分配菜单权限时，同时分配查询权限且查询权限不能独立取消，
      // 因为后台要做接口权限控制
      if(data.actions && data.actions.length){
        data.actions[0].checked = checked
        // data.actions[0].disabled = checked
        if(!checked){
          data.actions.forEach(item => item.checked = false)
        }
      }
      checkedKeys.push(-1,-2)
      let allChecked = this.isAllNodeChecked(this.authTreeData, checkedKeys)
      this.$refs.refAuthTree.setChecked(-2, allChecked)
    },
    onActionChange(data){
      // action 有一个选中，父节点选中
      let nodeChecked = data.actions.some(item => item.checked)
      this.$refs.refAuthTree.setChecked(data.id, nodeChecked)
      // data.actions[0].checked = nodeChecked;
      // data.actions[0].disabled = nodeChecked;

      let checkedKeys = this.$refs.refAuthTree.getCheckedKeys()
      checkedKeys.push( -1, -2) // 手机添加节点默认选中状态, -1 全选， -2隐藏节点
      let allChecked = this.isAllNodeChecked(this.authTreeData, checkedKeys)
      this.$refs.refAuthTree.setChecked(-2, allChecked)
    },
    
    isAllNodeChecked(nodeList, checkedKeys){
      if(!nodeList || !nodeList.length){
        return true
      }
      let allChecked = false
      for(let i = 0; i < nodeList.length; i++){
        let node = nodeList[i]
        if(!checkedKeys.includes(node.id)) return false
        
        if(node.actions && node.actions.length){
          allChecked = node.actions.every(action => action.checked)
          if(!allChecked) return false
        }
        allChecked = this.isAllNodeChecked(node.children, checkedKeys)
        if(!allChecked) return false
      }

      return true
    },

    // 获取选中的节点
    getCheckedKeys() {
      let nodeKeys = this.$refs.refAuthTree.getCheckedKeys()
      let actionKeys = this.getActionKeys(this.authTreeData)
      nodeKeys = nodeKeys.filter(key => key > 0) // 过滤掉手动添加的全选及隐藏节点
      return [...nodeKeys, ...actionKeys]
    },
    getActionKeys(nodeList){
      if(!nodeList || !nodeList.length){
        return []
      }
      let values = []
      nodeList.forEach(node => {
        let nodeValues = []
        // if(node.isLeaf && node.actions && node.actions.length){
        if(node.actions && node.actions.length){
          nodeValues = node.actions.filter(item => item.checked).map(item => item.id)
        } else {
          nodeValues = this.getActionKeys(node.children)
        }
        values = [...values, ...nodeValues]
      })
      return values
    },
    setActionKeys(nodeList, checked, keys){
      if(!nodeList || !nodeList.length){
        return
      }
      keys = keys || 'All'
      nodeList.forEach(node => {
        if(node.actions && node.actions.length){
          node.actions.forEach((item, index) => {
            item.checked = keys === 'All' ? checked : keys.includes(item.id)
            // item.disabled = this.readonly || (index === 0 && checked) 
            item.disabled = this.readonly
          })
        } 
        this.setActionKeys(node.children, checked, keys)
      })
    }
  },
}
</script>

<style lang="scss">
.yp-auth-tree{
  .el-tree__empty-block{text-align: left;}
  .el-tree__empty-text{ position: relative; left: 0;}
  .el-tree-node__label{font-size: .24rem;}
  .el-tree-node__content{
    height: auto;
    padding: .1rem 0;
    line-height: .4rem;
    align-items: flex-start;
    &:hover { background: transparent;}
  }
  .el-tree-node:focus > .el-tree-node__content { background: transparent;}
  .el-checkbox{ margin-right: 0;}
  .el-checkbox__label{font-size: .24rem; color: #2E3138; padding-left: .1rem;}
  .el-checkbox__inner{width: .20rem;height: .20rem;}
  .el-checkbox__inner::after{border-width: .04rem;}
  .is-checked .el-checkbox__label{color: #2E3138;}
  .yp-custom-node{
    color: #2E3138;
    font-size: .24rem;
    .yp-action-node{margin-left: -.2rem;}
    .el-checkbox{margin: .14rem .2rem 0;}
  }
  .el-tree-node__content>.el-tree-node__expand-icon{padding: .1rem;}
  .el-tree-node__content>label.el-checkbox{margin-right: .1rem;}
  .el-tree-node__expand-icon{margin-top: -.04rem;font-size: .24rem;}
  
  .el-tree[disabled] .el-tree-node__expand-icon{display: none;}
}
</style>
