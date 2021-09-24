<template>
  <el-form :model="dynamicForm" ref="refForm" inline class="yp-dynamic-form">
    <el-form-item v-for="(item,index) in dynamicForm.dataList" :key="item.key"
      :prop="'dataList.'+ index +'.value'"
      :rules="rules">
      <el-input 
        :placeholder="placeholder || '请输入'"
        v-model="item.value"
        clearable
        @blur="validate">
        <i v-if="index < dynamicForm.dataList.length-1 || index === 9" 
          slot="suffix" class="el-icon-remove-outline yp-btn-opt" 
          @click="rmItem(index)"></i>
        <i v-else slot="suffix" 
          class="el-icon-circle-plus-outline yp-btn-opt" 
          @click="addItem"></i>  
      </el-input>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'RmableInput',
  props: {
    type: String, // phone  email
    placeholder: String,
    initData: String | Array, 
    required: Boolean, // 是否必填
  },
  watch:{
    initData(newValue){
      this.formatData(newValue)
    }
  },
  data() {
    return {
      dynamicForm:{
        dataList:[],
      },
      rules:[],
      phoneRules:[
        { required: this.required, message: '请输入电话号码', trigger: 'blur'},
        { validator: this.validatePhone, message:'请输入正确电话号码', trigger: 'blur' },
        { validator: this.validateRepeat, message: '电话号码不能重复', trigger: 'blur' }
      ],
      emailRules:[
        { required: this.required, message: '请输入邮箱地址', trigger: 'blur' },
        { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' },
        { validator: this.validateRepeat, message: '邮箱地址不能重复', trigger: 'blur' }
      ]
    }
  },
  created(){
    this.formatData(this.initData)
    this.rules = this[this.type+'Rules'];
  },
  methods:{
    isMobile(mobile){
      let mobileRegex = /^[1]\d{10}$/;
      return mobileRegex.test(mobile);
    },
    isPhone(phone){
      let phoneRegex = /^[0][1-9]{2,3}-[0-9]{5,10}$/;
      return phoneRegex.test(phone)
    },
    validatePhone(rule, value, callback){
      if(!this.required && !value){ //非必填项时，不校验空值
        callback()
        return
      }
      
      if(!this.isMobile(value) && !this.isPhone(value)){
        callback(new Error())
        return
      }
      callback()
    },
    validateRepeat(rule, value, callback){
      if(!this.required && !value){
        callback()
        return
      }
      let filterItems = this.dynamicForm.dataList.filter(item => item.value === value)
      if(filterItems.length > 1){
        callback(new Error())
        return
      }
      callback()
    },
    getData(){
      return new Promise(resolve => {
        this.validate().then(valid => {
          if(!valid){
            resolve('')
            return
          }
          let dataList = this.dynamicForm.dataList.filter(item => item.value)
          let result = dataList.map(item => item.value).join(',')
          resolve(result)
        })
      })
    },
    validate(){
      return new Promise(resolve => {
        this.$refs.refForm.validate(valid => {
          resolve(valid)
        })
      })
    },
    formatData(newValue){
      if(!newValue || !newValue.length){
        this.dynamicForm.dataList = [{value:'', key: Date.now()}]
        return
      }
      if(typeof(newValue) === 'string'){
        newValue = newValue.split(',')
      }
      this.dynamicForm.dataList = newValue.map((item, index) => ({value: item, key: index}))
    },
    addItem(){
      // this.$refs.refForm.validate(valid => {
      //   if(!valid) return
      //   this.dynamicForm.dataList.push({value:'', key: Date.now()})
      // })
      this.dynamicForm.dataList.push({value:'', key: Date.now()})
    },
    rmItem(index){
      if(this.dynamicForm.dataList.length === 1){
        this.dynamicForm.dataList = [{value:''}]
        return
      }
      this.dynamicForm.dataList.splice(index, 1)
    }
  }
}
</script>
<style scoped lang="scss">
.el-form.yp-dynamic-form{
  padding: 0;
  margin: 0;
  .el-form-item__content{font-size: .18rem;line-height: .24rem;}
  .el-input{font-size: .18rem;line-height: .24rem;}
  .el-form-item{margin-left: .4rem;}
  .el-form-item:nth-child(odd){margin-left: 0;}
  .el-form-item__error{font-size: .18rem;}
  .yp-btn-opt{position: absolute;top: .06rem; right: -.5rem; color: #3F76F0;font-size: .32rem;}
}
</style>