
<template>
  <span
    class="tag-view"
    :class="{ 'tag-view_android': isAndroid }"
    :style="`margin: -0.16rem -${widthMeth - 4}px -0.16rem -${widthMeth}px`"
    v-show="message"
  >
    {{ message }}
  </span>
</template>


<script>
export default {
  data() {
    return {
      isAndroid: this.isAndroid(),
      widthMeth: 0,
    };
  },

  props: {
    message: {
      type: String,
      default: "",
    },
  },
  methods: {
    isAndroid() {
      const u = navigator.userAgent
      return u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    }
  },

  watch: {
    message: {
      handler() {
        this.$nextTick(() => {
          this.widthMeth = this.$el.offsetWidth / 4;
        });
      },

      immediate: true,
    },
  },
};
</script>


<style lang="less" scoped>
.tag-view {
  background: rgba(240, 242, 245, 1);
  border-radius: 0.04rem;
  padding: 0 0.15rem;
  height: 0.32rem;
  line-height: 0.32rem;
  font-size: 0.22rem;
  color: rgba(66, 72, 84, 1);
  display: inline-block;
  margin-right: 0.1rem;
}

.tag-view_android {
  font-family: miui;

  padding: 0 0.3rem;

  height: 0.64rem;

  line-height: 0.64rem;

  font-size: 0.44rem;

  transform: scale(0.5, 0.5);

  transform-origin: center center;

  margin: -0.16rem -9%;
}
</style>