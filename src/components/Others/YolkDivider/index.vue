<template>
  <div v-if="direction==='vertical'" class="yolk-divider">
    <template v-if="Array.isArray(content)">
      <template v-for="(item, index) in content">
        <span>{{item}}</span>
        <div class="yolk-divider__vertical-split yolk-divider__vertical-split--array"></div>
      </template>
    </template>
    <template v-else>
      <slot></slot>
      <span v-if="content">{{content}}</span>
      <div class="yolk-divider__vertical-split"></div>
    </template>
  </div>
</template>

<script>
	export default {
		name: 'yolkDivider',
		props: {
			direction: {
				type: String,
				default: 'vertical'
			},
			content: {
				type: [String, Number, Array]
			}
		}
	}
</script>

<style lang="scss">
  .yolk-divider {
    font-size: .24rem;
    color: #848484;
    &__vertical-split {
      display: inline-block;
      width: 1px;
      height: 1em;
      margin: 0 .1rem;
      vertical-align: middle;
      position: relative;
      background-color: rgba(46,45,45,0.2);
      &--array {
        &:last-child {
          display: none;
        }
      }
    }
  }
</style>
