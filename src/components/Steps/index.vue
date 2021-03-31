<template>
  <div class="yp-step" v-if="steps && steps.length">
    <div class="yp-step__item" 
      v-for="(step,index) in steps" 
      :key="index" 
      :class="{'yp-step__item--active':index <= activeIndex}"
      @click="onStepClick(step, index)">
      <span class="yp-step__icon">
        {{index + 1}}
      </span>
      <span class="yp-step__content">
        {{step}}
      </span>
      <span class="yp-step__split" v-if="index < steps.length-1">
        <i class="yp-step__split-icon"></i>
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
  .yp-step {
    padding: 20px;
    padding-right: 0;
    height: 32px;
    line-height: 1.2;
    display: flex;
    .yp-step__item {
      flex:1;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      margin-left: 20px;
      float: left;
      letter-spacing: 0;
      color: #9CA7B6;
      .yp-step__icon {
        display: inline-block;
        width: 32px;
        height: 32px;
        color: #fff;
        text-align: center;
        background-color: #9CA7B6;
        border-radius: 100%;
      }
      & .yp-step__split {
        margin-left: 20px;
      }
      & .yp-step__split-icon {
        font-weight: 600;
        line-height: 1.3;
        &:before{content: ">";}
      }
    }
    .yp-step__item--active {
      color: #3399FF;
      & > .yp-step__icon {
        background-color: #3399FF;
        
      }
      &  .yp-step__split-icon {
        color: #3399FF;
        
      }
    }
  }

</style>
