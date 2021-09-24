## 动态增减的input框

props: 
props: {
  type: String, // phone  email 空
  placeholder: String,
  initData: String | Array, 初始化数据
  required: Boolean, // 是否必填
},

methods:
validate() 主动触发文本校验
getData() 获取文本框输入值，