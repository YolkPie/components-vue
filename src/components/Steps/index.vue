<template>
  <div class="yk-step" v-if="steps && steps.length">
    <div class="step-list-item" 
      v-for="(step,index) in steps" 
      :key="index" 
      :class="{'is-active':index <= activeIndex}"
      @click="onStepClick(step, index)">
      <span class="item-text-icon">
        {{index + 1}}
      </span>
      <span class="item-text-content">
        {{step}}
      </span>
      <span class="item-text-direction" v-if="index < steps.length-1">
        <i class="icon-arrow-right"></i>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Steps',
    data: function () {
      return {
        curIndex: 0,
      }
    },
    props: {
      steps: {
        type: Array,
        default: []
      },
      activeIndex: {
        type: Number,
        default: 0
      }
    },
    watch:{
      activeIndex(newValue, oldValue){
        this.curIndex = newValue;
      }
    },
    mounted() {
      this.curIndex = this.activeIndex
    },
    methods: {
      onStepClick(step, index){
        if(index > this.curIndex) return;
        this.$emit("stepClick", step, index)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .yk-step {
    padding: 20px;
    padding-right: 0;
    height: 32px;
    line-height: 1.2;
    display: flex;
    .step-list-item {
      flex:1;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      margin-left: 20px;
      float: left;
      letter-spacing: 0;
      color: #9CA7B6;
      .item-text-icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        color: #fff;
        text-align: center;
        background-color: #9CA7B6;
        border-radius: 100%;
      }
      & > .item-text-direction {
        margin-left: 20px;
      }
      & > .item-text-direction  .icon-arrow-right {
        font-weight: 600;
        line-height: 1.3;
        &:before{content: ">";}
      }
    }
    .is-active {
      color: #3399FF;
      & > .item-text-icon {
        background-color: #3399FF;
        
      }
      & > .item-text-direction .icon-arrow-right {
        color: #3399FF;
        
      }
    }
  }

</style>
