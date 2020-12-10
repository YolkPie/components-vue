<template>
  <div class="shop" :class="item.productCount > 0 ? '' : 'shop--empty'">
    <a href="javascript:;" @click="jumpToShop(item.shopId)">
      <div class="shop__top">
        <div class="shop__top--left">
          <div class="shop__logowrap">
            <img class="shop__logo" :src="item.image" alt="">
          </div>
        </div>
        <div class="shop__top--right">
          <p class="shop__title">{{item.title}}</p>
          <div class="shop__statistics">
            <span class="statistics"><em class="statistics__count">{{item.productCount}}</em>件拍品</span>
            <!--          <span class="statistics"><em class="statistics__count">387</em>件在拍</span>-->
          </div>
          <b class="shop__istop" v-if="item.isTop">置顶</b>
        </div>
      </div>
    </a>
    <div class="shop__imgs" v-if="item.products && item.products.length" >
      <div class="shop__img" v-for="product in item.products" :key="product.paimaiId">
        <a href="javascript:;" @click="jumpToProduct(product.paimaiId)">
<!--        <i class="shop__isnew">上新</i>-->
          <img :src="formatImgUrlByIndex(product.paimaiId, product.image, 130, 130)" alt="">
        </a>
      </div>
      <a href="javascript:;" class="shop__more" @click="jumpToShop(item.shopId)">查看<br/>更多</a>
    </div>
    <div class="shop__imgs" v-else >
      <div class="shop__empty">暂无拍卖中的商品~</div>
    </div>
    <b class="shop__unfollowed" v-if="item.isFollowed === false"></b>
  </div>
</template>

<script>
import { formatImgUrlByIndex, webviewRedirect, eventUpload } from '../public/utils/tools'

export default {
  name: 'ShopItem',
  data () {
    return {
    }
  },
  props: {
    item: {
      required: true,
      type: Object
    }
  },
  methods: {
    formatImgUrlByIndex (index, halfPath, width, height) {
      return formatImgUrlByIndex(index, halfPath, width, height)
    },
    /**
     * 跳转到店铺页
     * @param shopId
     */
    jumpToShop (shopId) {
      if (shopId) {
        this.eventUpload('//shop.m.jd.com/?shopId=' + shopId)
      }
    },
    /**
     * 跳转到拍品详情页
     * @param paimaiId
     */
    jumpToProduct (paimaiId) {
      if (paimaiId) {
        webviewRedirect('//mpaimai.jd.com/' + paimaiId)
      }
    },
    /**
     * 上报埋点
     * @param url
     */
    eventUpload (url) {
      eventUpload({
        id: 'MAuction_Focus_Shop',
        param: this.item.index + '',
        href: url && url.length ? url : ''
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../public/css/mixin";
.shop {
  position: relative;
  width: 662px;
  padding: 24px 20px;
  background: @white;
  overflow: hidden;
  border-radius: 16px;
  &--empty {
    .shop {
      &__top {
        height: 56px;
      }
      &__title {

      }
      &__logowrap {
        margin-top: 12px;
      }
      &__statistics {
        display: none;
      }
    }
  }

  &__top {
    display: flex;
    height: 96px;
    overflow: hidden;
    &--right {
      position: relative;
      flex: 1;
      min-width: 562px;
      padding-left: 20px;
      box-sizing: border-box;
    }
  }
  &__logowrap {
    width: 96px;
    height: 32px;
    margin-top: 32px;
    background: url(//img11.360buyimg.com/devfe/sjfs/t1/67411/2/8256/2693/5d6373e7Eb92faf83/25cc047f9646b248.png) no-repeat;
    background-size: 100%;
    border-radius: 4px;
    overflow: hidden;
  }
  &__logo {
    width: 100%;
    height: 100%;
  }

  &__istop {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    line-height: 28px;
    padding: 0 6px;
    color: @red;
    background: rgba(225,48,48,0.10);
    border-radius: 4px;
  }

  &__title {
    width: 462px;
    height: 56px;
    font-size: 32px;
    font-weight: 500;
    line-height: 56px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__statistics {
    flex: 1;
  }
  &__imgs{
    position: relative;
    padding: 20px;
    background: @background;
    border-radius: 8px;
    margin-top: 24px;
    overflow: hidden;
  }
  &__img {
    position: relative;
    float: left;
    width: 130px;
    height: 130px;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 10px;
    background: #fff;
    a {
      display: block;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      mix-blend-mode: multiply;
    }
  }
  &__isnew {
    position: absolute;
    left: 0;
    top: 0;
    display: block;
    width: 52px;
    height: 28px;
    line-height: 28px;
    font-size: 20px;
    color: @white;
    background-image: linear-gradient(90deg, @red 3%, @red-light 100%);
    border-radius: 4px;
    text-align: center;

  }
  &__more {
    position: absolute;
    right: 20px;
    top: 0;
    display: flex;
    width: 52px;
    height: 100%;
    font-size: 20px;
    line-height: 24px;
    color: @light;
    justify-content: center;
    align-items: center;
  }
  &__empty {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 24px;
    color: @light;
  }
  &__expired {
    display: block;
    position: absolute;
    top: 0;
    right: -20px;
    width: 160px;
    height: 96px;
    background: url("../public/img/icon-expired.png") no-repeat;
    background-size: 100%;
    z-index: 1;
  }
  &__unfollowed {
    display: block;
    position: absolute;
    top: 0;
    right: 48px;
    width: 160px;
    height: 96px;
    background: url("../public/img/icon-unfollow.png") no-repeat;
    background-size: 100%;
    z-index: 1;
  }
}

.statistics {
  position: relative;
  font-size: 24px;
  color: @default;
  line-height: 36px;
  &__count {
    font-family: JDZhengHT-EN-Regular;
    font-size: 26px;
    font-weight: 400;
    margin-right: 4px;
  }
  &::after {
    content: '|';
    margin: 0 12px;
  }
  &:last-child::after {
    content: none;
  }
}
</style>
