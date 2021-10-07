<template>
  <div class="search-banner-inner" @click="() => $emit('click')">
    <span class="search-banner-inner__first">京选楼盘</span>
    <span class="search-banner-inner__second">VR看房</span>
    <span class="search-banner-inner__third">免费专车</span>
    <span class="search-banner-inner__fours">独家折扣</span>
    <img
      class="search-banner-inner__five"
      src="./tip-right.png"
      alt=""
      srcset=""
    />
  </div>
</template>

<script>
export default {
  name: 'electionFlag',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.search-banner-inner {
  height: 0.94rem;
  background: url(./bannerbg.png) no-repeat center /
    100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.3rem;
  color: #eeca94;
  font-size: 0.22rem;
  &__first {
    font-size: 0.3rem;
  }
  &__second {
    margin-left: 0.88rem;
  }
  &__third {
    margin-left: 0.4rem;
  }
  &__fours {
    margin-left: 0.4rem;
  }
  &__five {
    margin-left: auto;
    width: 0.1rem;
    height: 0.2rem;
  }
}
</style>