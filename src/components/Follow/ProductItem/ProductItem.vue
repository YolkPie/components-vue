<template>
  <div class="product">
    <a href="javascript:;" @click="jump(item.paimaiId,item.displayStatus)">
      <div class="product__top">
        <div class="product__top--left">
          <status-bar :start-time="item.startTime" :end-time="item.endTime" :auction-status="formatStatus(item.status,item.displayStatus)"></status-bar>
        </div>
        <div class="product__top--right">
          <span class="product__endstate">{{getStatusTxt(item.displayStatus)}}</span>
          <b class="product__istop" v-if="item.isTop">置顶</b>
        </div>
      </div>
      <div class="product__main">
        <div class="product__img">
          <img :src="formatImgUrl(item.paimaiId, item.image)" alt="">
        </div>
        <div class="product__info">
          <p class="product__title">{{item.title}}</p>
          <div class="product__price price">
            <label class="price__text">{{item.status === 0 ? '起拍价:' : '当前价:'}}</label>
            <span class="price__unit">￥</span>
            <em class="price__money">{{item.currentPriceStr}}</em>
          </div>
          <div class="product__statistics">
<!--          <span class="statistics">-->
<!--            <label class="statistics__label">报名</label><span class="statistics__count">{{item.ensureNum}}人</span>-->
<!--          </span>-->
            <span class="statistics" v-if="item.accessNum">
              <label class="statistics__label">围观</label><span class="statistics__count">{{item.accessNum}}人</span>
            </span>
          </div>
        </div>
      </div>
      <b class="product__unfollowed" v-if="item.isFollowed === false"></b>
    </a>
  </div>
</template>

<script>
import StatusBar from '../StatusBar/StatusBar'
import { formatImgUrlByIndex, eventUpload } from '../public/utils/tools'

const auctionStatus = {
  // 0: '默认',
  // 1: '审核通过',
  3: '已暂停',
  // 4: '审核驳回',
  5: '已撤回',
  6: '已暂缓',
  7: '已终止',
  8: '已删除'
}

export default {
  name: 'ProductItem',
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
  components: {
    StatusBar
  },
  methods: {
    /**
     * 格式化图片路径
     * @param paimaiId
     * @param halfPath
     * @returns {string}
     */
    formatImgUrl (paimaiId, halfPath) {
      return formatImgUrlByIndex(paimaiId, halfPath)
    },
    /**
     * 获取拍品状态文案
     * @param displayStatus
     */
    getStatusTxt (displayStatus) {
      if (auctionStatus[displayStatus]) {
        return auctionStatus[displayStatus]
      }
      return ''
    },
    /**
     * 跳转到拍品详情页
     * @param paimaiId
     * @param displayStatus
     */
    jump (paimaiId, displayStatus) {
      // 已删除拍品单品页不可访问
      if (paimaiId) {
        if (displayStatus === 8) {
          this.$toast('此拍品已被删除，请关注其他拍品～')
          this.eventUpload(null)
        } else {
          this.eventUpload('//mpaimai.jd.com/' + paimaiId)
        }
      }
    },
    /**
     * 根据status和displayStatus判断拍品状态
     * @param status
     * @param displayStatus
     */
    formatStatus (status, displayStatus) {
      if (typeof auctionStatus[displayStatus] !== 'undefined') {
        return 2
      }
      return status
    },
    /**
     * 上报埋点
     * @param url
     */
    eventUpload (url) {
      eventUpload({
        id: 'MAuction_Focus_Product',
        param: this.item.index + '_' + this.item.status,
        href: url && url.length ? url : ''
      })
    }
  }
}
</script>
<style lang="less">
@import "../public/css/mixin";
.product {
  position: relative;
  width: 662px;
  padding: 0 20px;
  background: @white;
  overflow: hidden;
  border-radius: 16px;


  &__top {
    .border-bottom-1px(@border);
    height: 36px;
    padding: 18px 0;
    overflow: hidden;
    z-index: 2;

    &--left {
      float: left;
    }

    &--right {
      float: right;
    }
  }

  &__endstate {
    font-size: 24px;
  }

  &__istop {
    font-size: 20px;
    line-height: 28px;
    padding: 0 6px;
    color: @red;
    background: rgba(225,48,48,0.10);
    border-radius: 4px;
    margin-left: 16px;
  }

  &__main {
    display: flex;
    padding: 24px 0;
  }
  &__img {
    width: 180px;
    min-width: 180px;
    height: 180px;
    border-radius: 8px;
    background: @background;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      mix-blend-mode: multiply;
    }
  }
  &__info {
    flex-grow: 1;
    padding-left: 20px;
  }
  &__title {
    height: 50px;
    max-width: 462px;
    font-size: 30px;
    line-height: 50px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__price {
    margin-top: 34px;
  }
  &__statistics {
    margin-top: 20px;
  }

  &__expired {
    display: block;
    position: absolute;
    top: 0;
    right: 48px;
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

.price {
  font-size: 24px;
  line-height: 40px;
  color: @light;
  &__unit {
    color: @red;
  }
  &__money {
    font-family: JDZhengHT-EN-Regular;
    font-size: 36px;
    color: @red;
    font-weight: 400;
  }
}
.statistics {
  font-size: 24px;
  color: @light;
  line-height: 28px;
  margin-right: 48px;
  &__count {
    color: @default;
    margin-left: 8px;
  }
}
</style>
