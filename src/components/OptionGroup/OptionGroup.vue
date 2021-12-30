<template>
  <div v-if="values && values.length" class="option-group">
    <p class="option-group__title" v-if="title && title.length">{{title}}</p>
    <div class="option-group__content">
      <p :class="`option-group__item ${selectedValue === item.value ? 'option-group__item--checked' : ''} ${item.disabled ? 'option-group__item--disabled' : ''} ${isLarge ? 'option-group__item--large' : ''}`" v-for="(item, index) in values" :key="index" @click="() => chooseItem(item)"><span>{{item.label}}</span></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'OptionGroup',
  props: {
    title: {
      type: String,
      default: ''
    },
    values: {
      type: Array,
      default: () => []
    },
    isCanCancel: {
      type: Boolean,
      default: true
    },
    selectedValue: {
      type: [Number, String],
      default: ''
    },
    isLarge: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    chooseItem (item) {
      if (item.disabled) return
      if (this.isCanCancel) {
        console.log(item.selectedValue === item.value ? '' : item.value)
        this.$emit('chooseOption', item.selectedValue === item.value ? '' : item.value)
        return
      }
      this.$emit('chooseOption', item.value)
    }
  }
}
</script>
<style lang="scss">
.option-group {
  margin-top: 48px;
  padding-left: 36px;
  &__title {
    font-size: 28px;
    line-height: 28px;
    color: #333333;
    font-weight: bold;
  }

  &__content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  &__item {
    box-sizing: border-box;
    flex-basis: 160px;
    width: 160px;
    font-size: 24px;
    height: 64px;
    line-height: 64px;
    margin: 24px 24px 0 0;
    background: #f6f6f6;
    border-radius: 32px;
    text-align: center;
    &:last-child {
      margin-right: 0;
    }

    &--large {
      flex-basis: 246px;
      width: 246px;
    }

    & > span {
      display: block;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--checked {
      background: #fff2f2;
      color: #e13030;
    }

    &--disabled {
      color: #999999;
    }
  }
}
</style>
