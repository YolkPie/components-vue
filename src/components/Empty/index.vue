<template>
  <div class="empty-container">
    <div class="empty-container__image">
      <img class="empty-container__image" :src="errorImage" alt="" />
    </div>
    <p class="empty-container__description">{{errorMessage}}</p>
    <div class="empty-container__footer">
      <slot />
    </div>
  </div>
</template>
 <script>
export default {
  data() {
    return {};
  },
  props: {
    errorImage: {
      type: String,
      default: "https://z3.ax1x.com/2021/03/31/cA0kkt.png",
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  mounted() {},
  methods: {},
};
</script>

 <style lang="less" scoped>
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 32px 0;
  width: 100%;
  height: 80%;
}
.empty-container__image {
  width: 160px;
  height: 160px;
}
.empty-container__description {
  font-size: 14px;
  margin-top: 8px;
}
.empty-container__footer {
  margin-top: 0.5rem;
}
</style>