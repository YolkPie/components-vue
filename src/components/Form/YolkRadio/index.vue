<template>
  <div v-if="radioInfo" class="radio-cell" :class="[{'radio-cell--disabled': disabled}, outClassName]" @click="clickRadioItem">
    <div class="radio-cell__content">
      <div v-if="Array.isArray(radioInfo)" >
        <div
          class="radio-cell__row"
          v-for="(item, index) in radioInfo" :key="'radio_'+index"
        >
          <span class="radio-cell__left-content">{{item.title}}</span>
          <span class="radio-cell__right-content">{{item.value}}</span>
        </div>
      </div>
      <div v-else class="radio-cell__right-content">{{radioInfo}}</div>
      <div class="radio-cell__btn-box">
        <span
          class="radio-cell__btn-icon"
          :class="{'radio-cell__btn-icon--selected': isChecked}"
        ></span>
      </div>
      <slot name="notCheck"></slot>
    </div>
    <slot name="tip"></slot>
  </div>
</template>

<script>
	export default {
		name: 'yolkRadio',
    props: {
			outClassName: {
				type: String,
				default: ''
			},
			radioInfo: {
				type: [String, Array]
      },
			isChecked: {
				type: Boolean,
				default: false
      },
			disabled: {
				type: Boolean,
        default: false
      }
    },
    methods: {
			clickRadioItem() {
				this.$emit('click')
      }
    }
	}
</script>

<style lang="scss">
  .radio-cell {
    position: relative;
    font-size: .28rem;
    &__content {
      position: relative;
    }
    &__row {
      margin-bottom: .08rem;
      line-height: .4rem;
      &:last-child  {
        margin-bottom: 0;
      }
    }
    &__left-content {
      display: inline-block;
      min-width: 1.52rem;
      color: #848689;
    }
    &__right-content {
      color: #2E2D2D;
    }
    &__btn-box {
      position: absolute;
      width: .58rem;
      height: .78rem;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
    &__btn-icon {
      position: absolute;
      top: .2rem;
      right: .06rem;
      width: .38rem;
      height: .38rem;
      background: url('https://img10.360buyimg.com/imagetools/jfs/t1/147258/5/11646/736/5f8e98b3E40dfd706/f8f8ed65ff8fd669.png') no-repeat center/contain;
      &--selected {
        background: url('https://img10.360buyimg.com/imagetools/jfs/t1/142646/22/11445/805/5f8e98b3Eb679852b/549ca246a34a9dcb.png') no-repeat center/contain;
      }
    }
  }
  .radio-cell--disabled {
    color: #A6AAB0;
    .radio-cell__left-content {
      color: #A6AAB0;
    }
    .radio-cell__right-content {
      color: #A6AAB0;
    }
    .radio-cell__btn-box {
      display: none;
    }
  }
</style>
