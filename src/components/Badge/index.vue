<template>
  <div
    class="yk-badge"
    :style="{backgroundColor: color}"
    :class="[type, size]">
    <slot></slot>
  </div>
</template>

<script>
	export default {
		name: 'yolkBadge',
    props: {
			color: String,
      type:{
        type:String,
        default: 'primary'
      },
      size:{
        type:String,
        default: 'normal'
      }
    },
    methods: {
		
    }
	}
</script>

<style lang="scss">
  .yk-badge{
    color: #fff;
    text-align: center;
    display:inline-block;

    &.success{ background-color:#4caf50}
    &.primary{ background-color:#26a2ff}
    &.error{ background-color:#f44336}
    &.warning{ background-color:#ffc107}

    &.normal{
      border-radius: 0.24rem;
      font-size: 0.28rem;
      padding: 0.02rem 0.08rem;
    }
    &.small{
      border-radius: 0.16rem;
    font-size: 0.24rem;
    padding: 0.02rem 0.06rem;
    }
    &.large{
      border-radius: 0.28rem;
    font-size: 0.36rem;
    padding: 0.02rem 0.1rem;
    }
  }
</style>
