<template>
  <div class="album">
    <a href="javascript:;" @click="jump(item.albumId)">
      <div class="album__top">
        <div class="album__top--left">
          <status-bar :start-time="item.startTime" :end-time="item.endTime" :auction-status="item.status"></status-bar>
        </div>
        <div class="album__top--right">
          <b class="album__istop" v-if="item.isTop">置顶</b>
        </div>
      </div>
      <div class="album__main">
        <div class="album__main--left">
          <img class="album__img" :src="formatImgUrl(item.albumId, item.image)" alt="">
        </div>
        <div class="album__main--right">
          <p class="album__title">{{item.title}}</p>
          <div class="album__info">
            <span class="album__vendor">送拍机构: {{item.vendorName}}</span>
            <!--          <div class="album__statistics">-->
            <!--                      <span class="statistics"><em class="statistics__count">20</em><span>件拍品</span></span>-->
            <!--                      <span class="statistics"><em class="statistics__count">387</em><span>次出价</span></span>-->
            <!--          </div>-->
          </div>
        </div>
        <!--      <div class="album__imgs">-->
        <!--        <div class="album__img">-->
        <!--          <img src="../../../../assets/img/test.png" alt="">-->
        <!--        </div>-->
        <!--        <div class="album__img">-->
        <!--          <img src="../../../../assets/img/test.png" alt="">-->
        <!--        </div>-->
        <!--        <div class="album__img">-->
        <!--          <img src="../../../../assets/img/test.png" alt="">-->
        <!--        </div>-->
        <!--        <div class="album__img">-->
        <!--          <img src="../../../../assets/img/test.png" alt="">-->
        <!--        </div>-->
        <!--        <div class="album__img">-->
        <!--        <img src="../../../../assets/img/test.png" alt="">-->
        <!--        </div>-->
        <!--        <div class="album__img">-->
        <!--          <img src="../../../../assets/img/test.png" alt="">-->
        <!--        </div>-->
        <!--      </div>-->
      </div>
      <b class="album__unfollowed" v-if="item.isFollowed === false"></b>
    </a>
  </div>
</template>

<script>
import StatusBar from '../StatusBar/StatusBar'
import { formatImgUrlByIndex, eventUpload } from '../public/utils/tools'
export default {
  name: 'AlbumItem',
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
     * @param albumId
     * @param halfPath
     * @returns {string}
     */
    formatImgUrl (albumId, halfPath) {
      return formatImgUrlByIndex(albumId, halfPath) + '!cc_96x96'
    },
    /**
     * 跳转到专场详情页
     * @param albumId
     */
    jump (albumId) {
      if (albumId) {
        this.eventUpload('//mpaimai.jd.com/album/' + albumId)
      }
    },
    /**
     * 上报埋点
     * @param url
     */
    eventUpload (url) {
      eventUpload({
        id: 'MAuction_Focus_Venue',
        param: this.item.index + '_' + this.item.status,
        href: url && url.length ? url : ''
      })
    }
  }
}
</script>
<style lang="less" scoped>
@import "../public/css/mixin";

.album {
  position: relative;
  width: 662px;
  padding: 0 20px;
  background: @white;
  overflow: hidden;
  border-radius: 16px;

  &__item {
    position: relative;
    left: 0;
    transition: left;
  }

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
    padding: 22px 0 24px 0;
    overflow: hidden;
    &--left {
      float: left;
      width: 96px;
      img {
        width: 96px;
        height: 96px;
        border-radius: 4px;
        background: #F6F6F6;
      }
    }
    &--right {
      float: left;
      width: 546px;
      padding-left: 20px;
    }
  }
  &__title {
    height: 38px;
    max-width: 546px;
    font-size: 30px;
    line-height: 38px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  &__info {
    max-width: 546px;
    display: flex;
    //justify-content: flex-end;
    justify-content: left;
    margin-top: 30px;
    font-size: 22px;
    color: @light;
    height: 26px;
    line-height: 26px;
  }
  &__vendor {
    display: block;
    //width: 2.56rem;
    height: .26rem;
    line-height: .26rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__statistics {
    flex: 1;
    text-align: right;
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
  &__imgs{
    width: 690px;
    height: 150px;
    margin-top: 22px;
    overflow: hidden;
  }
  &__img {
    float: left;
    width: 150px;
    height: 150px;
    border-radius: 8px;
    background: @background;
    overflow: hidden;
    margin-right: 21px;
    img {
      width: 100%;
      height: 100%;
      mix-blend-mode: multiply;
    }
  }
}
.status {
  height: 36px;
  line-height: 36px;
  background: @background;
  border-radius: 5px;
  overflow: hidden;

  &__text {
    display: inline-block;
    width: 90px;
    height: 36px;
    vertical-align: top;
    font-size: 22px;
    color: @white;
    text-align: center;
    background-image: linear-gradient(90deg, @gray 4%, @gray-light 100%);
  }

  &__time {
    font-family: JDZhengHT-EN-Regular;
    font-size: 28px;
    line-height: 38px;
    color: @default;
    padding: 0 16px;
  }

  &--doing {
    .status {
      &__text {
        background-image: linear-gradient(90deg, @red 3%, @red-light 100%);
      }

      &__time {
        color: @red;
      }
    }
  }

  &--todo {
    .status {
      &__text {
        background-image: linear-gradient(90deg, @green 0%, @green-light 100%);
      }

      &__time {
        color: @green;
      }
    }
  }
}
.statistics {
  position: relative;
  font-size: 22px;
  color: @light;
  line-height: 26px;
  &__count {
    font-family: JDZhengHT-EN-Regular;
    font-weight: 400;
    color: @default;
    margin-right: 2px;
    vertical-align: middle;
  }
  span {
    vertical-align: middle;
  }
  &::after {
    content: '|';
    margin: 0 11px;
  }
  &:last-child::after {
    content: none;
  }
}
</style>
