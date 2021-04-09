<template>
  <div class="yolk-divider" :class="outClassName">
    <template v-if="Array.isArray(content)">
      <template v-for="(item, index) in content">
        <span>{{item}}</span>
        <div :class="['yolk-divider__'+direction+'-split', 'yolk-divider__'+direction+'-split--array']"></div>
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
			outClassName: {
				type: String,
				default: ''
			},
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
      margin: 0 10px;
      vertical-align: middle;
      position: relative;
      background-color: rgba(46,45,45,0.2);
      &--array {
        &:last-child {
          display: none;
        }
      }
    }
    &__horizontal-split {
      margin: 10px 0;
      width: 100%;
      height: 1px;
      background-color: rgba(46,45,45,0.2);
      &--array {
        &:last-child {
          display: none;
        }
      }
    }
  }
</style>
