<template>
  <div class="evaluate-emoji-box">
    <div
      class="evaluate-emoji-box_item"
      v-for="(item, index) in viewList"
      :key="index"
      @click="handleChangeEmoji(index)"
    >
      <img
        :class="`evaluate-emoji-box_item-emoji ${
          activeIndex === index && activeIndex === 2 ? 'nice' : ''
        }`"
        :src="activeIndex === index ? item.select : item.unselect"
        alt=""
      />
      <span
        :class="`evaluate-emoji-box_item-title ${
          activeIndex === index ? 'select' : ''
        }`"
        >{{ item.title }}</span
      >
    </div>
  </div>
</template>

<script>
import general from "./imgs/general.png";
import generaled from "./imgs/generaled.png";
import satisfie from "./imgs/satisfie.png";
import satisfied from "./imgs/satisfied.png";
import unsatisfie from "./imgs/unsatisfie.png";
import unsatisfied from "./imgs/unsatisfied.png";

export default {
  props: {
    selectIndex: {
      type: [Number, String],
      default: null,
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    selectIndex: {
      handler(val) {
        if (typeof val !== "undefined") {
          this.activeIndex = val * 1;
        }
      },
      immediate: true
    },
  },
  data() {
    return {
      viewList: [
        {
          select: unsatisfied,
          unselect: unsatisfie,
          title: "不满意",
        },
        {
          select: generaled,
          unselect: general,
          title: "一般",
        },
        {
          select: satisfied,
          unselect: satisfie,
          title: "满意",
        },
      ],
      activeIndex: 2,
    };
  },
  methods: {
    handleChangeEmoji(index) {
      if(this.disable) return
      this.activeIndex = index;
      this.$emit("handleChangeEmoji", index);
    },
  },
};
</script>


<style lang="scss" scoped>
.evaluate-emoji-box {
  margin-top: 0.6rem;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  &_item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: .85rem;
    height: 1.28rem;

    &:nth-child(2) {
      margin: 0 1.4rem;
    }

    &-emoji {
      width: 0.74rem;
      height: 0.74rem;
      border-radius: 50%;
      overflow: hidden;

      &.nice {
        width: 0.99rem;
        height: 0.84rem;
        margin-top: -0.1rem;
        margin-right: -0.1rem;

        border-radius: 0.1rem;
      }
    }
    &-title {
      color: #848688;
      font-size: 0.28rem;
      margin-top: 0.16rem;

      &.select {
        color: #424854;
        font-weight: 500;
      }
    }
  }
}
</style>
