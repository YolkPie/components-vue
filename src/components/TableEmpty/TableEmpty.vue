<template>
  <div class="data-empty">
    <img :src="image || require('./images/empty_data.png')"  :style="{ width: imageSize+'px'}"/>
    <p class="msg">{{message || '暂无数据'}}</p>
  </div>
</template>
<script>
export default {
  name: 'TableEmpty',
  props: {
    image: String,
    imageSize: Number,
    message: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      
    }
  },
  methods:{
    
  }
}
</script>
<style scoped lang="scss">
.data-empty{
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  // margin: 50px;
  img{ width: 160px;}
  .msg{
    font-size: 14px;
    color:#A5ABB8; 
    line-height:20px;
    text-align: center;
    margin: 18px 0;
  }
}
</style>