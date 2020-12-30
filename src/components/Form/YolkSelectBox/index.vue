<template>
  <div class="select-box"
       :class="{
  	      'selected': selected,
  	      'disabled': disabled,
       }"
       @click="clickSelectBox"
  >
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: 'yolkSelectBox',
    props: {
			disabled: { // 是否禁用
				type: Boolean,
        default: false
      },
			selected: { // 当前是否勾选
				type: Boolean,
				default: false
      }
    },
    methods: {
			clickSelectBox() {
				this.$emit('click')
      }
    }
	}
</script>

<style scoped lang="scss">
  .select-box {
    position: relative;
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 .15rem;
    width: 2.1rem;
    height: .56rem;
    font-size: .24rem;
    color: rgba(66,72,84,1);
    border-radius: .08rem;
    background: rgba(240,242,245,1);
    border: .01rem solid rgba(240,242,245,1);
    box-sizing: border-box;
    overflow: hidden;
    text-align: center;
    &.disabled {
      color: rgba(166,170,176,1);
    }
    &.selected {
      position: relative;
      background: rgba(253,246,235,1);
      border: 1px solid rgba(199,162,106,1);
    }
    &.selected:after {
      content: '';
      position: absolute;
      right: -1px;
      bottom: -1px;
      width: .2rem;
      height: .2rem;
      background: url(https://img13.360buyimg.com/imagetools/jfs/t1/154226/23/3099/504/5f8ff927E429ae922/5f3a592be69bef7c.png) no-repeat center/contain;
    }
    &.disabled {
      color: rgba(166,170,176,1);
      background-color: #F0F2F5;
      border: none;
    }
    &.disabled:after {
      display: none;
    }

  }
</style>
