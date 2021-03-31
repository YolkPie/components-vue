<template>
  <div class="skeleton">
    <div class="skeleton-container" v-show="loading">
      <div class="skeleton-container__avatar" v-show="showAvatar"></div>
      <ul class="skeleton-container-header" >
        <li class="skeleton-container-header__title" v-show="showTitle"></li>
        <li
          class="skeleton-container-header__row"
          v-for="(item, index) in row"
          :key="`row${index}`"
        ></li>
      </ul>
    </div>

    <div v-show="!loading">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTitle: false,
      showAvatar: false
    };
  },
  props: {
    loading: {
      type: Boolean,
      default: true,
    },
    row: {
      type: Number,
      default: 3,
    },
  },
  mounted() {
    const { title, avatar } = this.$attrs || {};
    this.showTitle = typeof title !== "undefined";
    this.showAvatar = typeof avatar !== "undefined";
  },
};
</script>

<style lang="less" scoped>
.skeleton {
  width: 100%;
  min-width: 50vw;
  padding: 10px;
  box-sizing: border-box;
}
.skeleton-container {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
}
.skeleton-container__avatar {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  margin-right: 16px;
  background-color: #f2f3f5;
  border-radius: 50%;
}
.skeleton-container-header {
  margin: 0;
  padding: 0;
  width: 100%;
}
.skeleton-container-header__title {
  width: 40%;
  margin-top: 10px;
  height: 16px;
  background-color: #f2f3f5;
}
.skeleton-container-header__row {
  width: 100%;
  margin-top: 20px;
  height: 16px;
  background-color: #f2f3f5;
}
</style>