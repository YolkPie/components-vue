<template>
  <div :class="{'bottom-fit': bottomFit}">
    <div class="bottom-btn">
      <div class="bottom-btn--content" @click="clickBtn">
        <slot></slot>
      </div>
    </div>
    <div class="bottom-btn--blank-block"></div>
  </div>

</template>

<script>
	export default {
		name: 'yolkBottomBtn',
    props: {
			bottomFit: {
				type: Boolean,
				default: false
      }
    },
    methods: {
			clickBtn() {
				this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
  .bottom-btn {
    position: fixed;
    bottom: 0;
    padding: 22px 30px;
    width: 100%;
    height: 128px;
    background-color: #fff;
    box-shadow: 0 -4px 8px 0 rgba(245,245,245,1);
    box-sizing: border-box;
    &--content {
      width: 100%;
      height: 84px;
      line-height: 84px;
      font-size: 34px;
      color: #fff;
      background-color: #C7A26A;
      border-radius: 8px;
      text-align: center;
    }
    &--blank-block {
      width: 100%;
      height: 128px;
      background-color: #f7f8fa;
    }
  }
  .bottom-fit {
    height: 162px;
  }
</style>
