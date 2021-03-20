<template>
  <div class="housing-list-card J_ping" @click="toHouseDetail(cardinfo)">
    <img
      class="housing-list-card__house-img"
      v-lazy="imgFilter(cardinfo.mainPic)"
    />
    <div class="housing-list-card__info-box">
      <h3 class="housing-list-card__info-title">{{ cardinfo.title }}</h3>
      <ul class="housing-list-card__label-list">
        <li
          :class="`housing-list-card__label-item border ${
            isAndroid ? 'housing-list-card__android-label-item' : ''
          }`"
          v-for="(itemm, indexx) in cardinfo.labels"
          :key="'_lables' + indexx"
          v-show="indexx < 4"
        >
          {{ itemm }}
        </li>
      </ul>
      <div class="housing-list-card__Characteristics-list">
        <span class="housing-list-card__Characteristics-item"
          >{{ cardinfo.room }}室{{ cardinfo.hall }}厅</span
        >
        <span class="housing-list-card__Characteristics-item-split">/</span>
        <span class="housing-list-card__Characteristics-item"
          >{{ cardinfo.structureArea }}平</span
        >
        <!-- <span class="housing-list-card__Characteristics-item-split">/</span>
        <span class="housing-list-card__Characteristics-item">{{
          cardinfo.orientation
        }}</span> -->
        <span class="housing-list-card__Characteristics-item-split">/</span>
        <span class="housing-list-card__Characteristics-item">{{
          cardinfo.plotName
        }}</span>
      </div>
      <div v-show="cardinfo.distance" class="housing-list-card__subdist">
        距离{{ cardinfo.subwayName + cardinfo.stationName }}站{{
          cardinfo.distance
        }}米
      </div>
      <div v-show="cardinfo.nearbyDistance" class="housing-list-card__subdist">
        附近{{ cardinfo.nearbyDistance }}米
      </div>
      <div class="housing-list-card__house-price">
        <span
          v-show="cardinfo.totalPrice"
          class="housing-list-card__total-price"
          >{{ cardinfo.totalPrice
          }}<span class="housing-list-card__unit">万</span></span
        ><span
          v-show="cardinfo.unitPrice"
          class="housing-list-card__average-price"
          >{{ cardinfo.unitPrice }}元/平</span
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardinfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  computed: {
    currCityId() {
      try {
        return window.sessionStorage.cityid || this.$store.state.cityid || 1;
      } catch (e) {
        return this.$store.state.cityid;
      }
    },
  },
  data() {
    return {
      isAndroid: this.isAndroid(),
      resultEmpty: false,
    };
  },
  methods: {
    isAndroid() {
      const UA = window.navigator.userAgent.toLowerCase();
      return UA && /android/.test(UA.split(";")[1]);
    },
    toHouseDetail(item) {
      this.$emit("click", item);
      // RN加上链接，使用三端协议跳转
      let jumpLink = `${esfRNUrl}detailsPage?parmkey=${item.houseResourceId}`;
      // RN跳转
      jumpLink = `${jumpLink}&jdreactkey=JDReactSHHouse&jdreactapp=JDReactSHHouse&rn_routerName=detailsPage&rn_parmkey=${item.houseResourceId}`;
      location.href = encodeURI(jumpLink);
    },
    imgFilter(url) {
      return this.imgSize(url, "", "300x300", 80, "!cc_1x1");
    },
    imgSize(url, nx, size, q, wh) {
      //第一个参数是路径必传，
      //第二个参数是业务域名,非必传，默认"esf"支持gif动图,补白图为方形，为'da','n0','n1','n2','n3','n4'
      //第三个参数是尺寸,非必传，默认"800x800",屏幕1/2宽度可以400x400"，1/3可以是"300x300"
      //第四个参数是将质程度,非必传,默认70
      //第五个参数是按照一定的宽高比例裁剪图片，非必传，传入形式'!cc_2x1','!cc_5x3'
      var nx = nx || "esf";
      var size = size || "800x800";
      var q = q || 70;
      var whnow = wh || "";
      var ext = "";
      var webpCanUse = false;
      try {
        var localWebp = window.localStorage.webpCanUse;
        if (localWebp) {
          //已测试过：
          if (localWebp == "1") {
            //且可以支持
            webpCanUse = true;
          }
        } else {
          //未测试过：
          var img = new Image();
          img.onload = function () {
            if (img.width > 0 && img.height > 0) {
              webpCanUse = true;
              window.localStorage.webpCanUse = 1;
            }
          };
          img.onerror = function () {
            window.localStorage.webpCanUse = 2;
          };
          img.src =
            "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA";
        }
      } catch (e) {}
      if (webpCanUse) {
        ext = ".webp";
      }
      if (/\/jfs\//.test(url)) {
        //全路径的时候
        if (/\.gif$/.test(url)) {
          return (
            "https://img11.360buyimg.com/esf/" + url.split("/jfs/")[1] + whnow
          );
        } else {
          return (
            "https://img11.360buyimg.com/" +
            nx +
            "/s" +
            size +
            "_jfs/" +
            url.split("/jfs/")[1] +
            "!q" +
            q +
            whnow +
            ext
          );
        }
      } else if (/^jfs\//.test(url)) {
        //jfs开头的路径的时候
        if (/\.gif$/.test(url)) {
          return "https://img11.360buyimg.com/esf/" + url + whnow;
        } else {
          return (
            "https://img11.360buyimg.com/" +
            nx +
            "/s" +
            size +
            "_" +
            url +
            "!q" +
            q +
            whnow +
            ext
          );
        }
      } else {
        //不做处理
        return url;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.housing-list-card {
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  box-shadow: 0 0.01rem 0.08rem 0 rgba(0, 0, 0, 0.08);
  margin-bottom: 0.3rem;
  &__house-img {
    height: 2.2rem;
    width: 2.2rem;
  }
  &__info-box {
    padding: 0.16rem;
    padding-bottom: 0.6rem;
    width: 4.15rem;
    min-height: 1.44rem;
    position: relative;
  }
  &__info-title {
    font-size: 0.3rem;
    line-height: 0.42rem;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: bold;
  }
  &__label-list {
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    padding-top: 0.1rem;
    padding-bottom: 0.05rem;
    overflow: hidden;
  }
  &__label-item {
    font-size: 0.22rem;
    color: #c7a26a;
    padding: 0 0.1rem;
    margin-right: 0.12rem;
    text-align: center;
    display: inline-block;
    height: 0.32rem;
    line-height: 0.32rem;
    &::before {
      border-color: #c7a26a;
      border-radius: 2px;
    }
  }
  &__android-label-item {
    font-family: miui;
    line-height: 0.38rem;
  }
  &__Characteristics-list {
    font-size: 0.24rem;
    color: #848689;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    padding: 0.1rem 0 0.02rem;
  }
  &__Characteristics-item {
    display: inline-block;
    max-width: 1.8rem;
    height: 0.44rem;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  &__Characteristics-item-split {
    padding: 0 0.12rem;
  }
  &__subdist {
    font-size: 0.24rem;
    color: #848689;
    padding: 0.04rem 0 0.1rem;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &__house-price {
    position: absolute;
    bottom: 0.2rem;
  }
  &__total-price {
    font-size: 0.32rem;
    color: #c7a26a;
  }
  &__unit {
    font-size: 0.24rem;
  }
  &__average-price {
    font-size: 0.24rem;
    color: #848689;
    margin-left: 0.15rem;
  }
}
</style>