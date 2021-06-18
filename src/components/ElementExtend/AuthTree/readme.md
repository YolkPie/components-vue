## 权限分配树

props: 
readonly: 整个树是否只读
checkedKeys:[] // 选中节点Id
authTreeData 数据结构
{
  id:179, // id
  label:"父菜单1", 
  isLeaf: true, 
  actions:[
    {
      id:179, // id
      label:"操作名称",
      checked: false,
      disabled: false 
    }
  ],
  children:[
    // 重复节点结构
  ]
}

methods:
setData(treeData) 设置权限树的值
getCheckedKeys() 获取选中节点的id  包括树节点及actions节点