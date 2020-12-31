<template>
  <div class="pannel-box">
    <div v-if="title" class="pannel-title">{{title}}</div>
    <slot></slot>
  </div>

</template>

<script>
	export default {
		name: 'yolkPannel',
    props: {
			title: String
    },
    methods: {
		
    }
	}
</script>

<style lang="scss">
  .pannel-box{
    position: relative;
    padding: .2rem;
    border-radius: .1rem;
    border: 1px solid rgba(46,45,45,0.2);
    background: #fff;
    line-height: .25rem;
    
    .pannel-title{
      padding:0 .1rem;
      font-size: .18rem;
      line-height:.2rem;
      background: #fff;
      position: absolute;
      top: -.1rem;
      left: .1rem;
    }
  }
</style>
