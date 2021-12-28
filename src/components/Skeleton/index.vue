<template>
  <yk-skeleton>
    <div style="margin-top: 20px;margin-left: 10px;">
      <b>测试标题</b>
    </div>
    <p style="margin-top: 20px;">
      <span> 测试</span>
    </p>
    <p class="content">
      <i> 我也是有内容的我也是有内容的我也是有内容的我也是有内容的</i>
    </p>
  </yk-skeleton>
</template>
<script>
import Vue from 'vue'
import YKSkeleton from './YKSkeleton.js'
Vue.component(YKSkeleton.name, YKSkeleton)
export default {
  // components: { YKSkeleton },

}
</script>
<style lang="scss">
  .content{width: 3rem; margin-top:  50px; margin-left: 60px;}
  .yk-skeleton {
    background-image: linear-gradient(90deg,#f2f2f2 25%,#e6e6e6 37%,#f2f2f2 63%) !important;
    background-color: transparent !important;
    background-size: 400% 100%;
    animation: skeleton-loading 1.5s ease-in infinite;
    min-height: .3rem;
    min-width: 1rem;
    display: inline-block;
  }
  
  @keyframes skeleton-loading {
    from {
      background-position: 100% 50%;
    }
    to {
      background-position: 0 50%;
    }
  }
</style>