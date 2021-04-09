<template>
  <div class="bottom-btn" :class="outClassName">
    <div class="bottom-btn__wrap">
      <div class="bottom-btn__content" @click="clickBtn">
        <slot></slot>
      </div>
    </div>
    <div class="bottom-btn__blank-block" v-if="bottomFit"></div>
  </div>
</template>

<script>
	export default {
		name: 'yolkBottomBtn',
    props: {
			outClassName: {
				type: String,
				default: ''
      },
			bottomFit: {
				type: Boolean,
				default: false
      },

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
    width: 100%;
    &__wrap {
      padding: 22px 30px;
      box-shadow: 0 -4px 8px 0 rgba(245,245,245,1);
      box-sizing: border-box;
      background-color: #fff;
    }
    &__content {
      width: 100%;
      height: 84px;
      line-height: 84px;
      font-size: 34px;
      color: #fff;
      background-color: #C7A26A;
      border-radius: 8px;
      text-align: center;
    }
    &__blank-block {
      width: 100%;
      height: 34px;
      background-color: #f7f8fa;
    }
  }
</style>
