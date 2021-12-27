## 树形菜单组件
支持无限级菜单加载，本站跳转，站外跳转

props
menuData:[
	{"id":1,"menuName":"首页","menuUrl":"/dashboard","icon":"dashboard","parent":true,"pid":"-1",children:[

  ]},
]
curMenu: menu里的一个对象，当前选中的菜单
icon: 支持图标选中高亮
menuUrl:跳转路由地址，配置全路径时，打开新Tab加载地址
可无限级加载