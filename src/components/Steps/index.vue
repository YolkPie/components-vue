<template>
  <div class="yk-step" v-if="dataList">
    <div class="yk-step-list">
      <div class="step-list-item" v-for="(item,m) in dataList" :key="m" :class="{'is-active':item.active}">
        <span class="item-text-icon">
          {{m+1}}
        </span>
        <span class="item-text-content">
          {{item.text}}
        </span>
        <span class="item-text-direction" v-if="m<=1">
          <i class="icon-arrow-right"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'Steps',
    data: function () {
      return {
        dataList: [],
      }
    },
    props: {
      text: {
        type: Array,
        default: []
      },
      activeStatu: {
        type: Number,
        default: 0
      }
    },
    watch: {
      activeStatu: function (val, oldVal) {
        this.$nextTick(() => {
          if (val !== oldVal) {
            this.activeStatu = val;
            this.checkActive();
          }
        });
      }
    },
    mounted() {
      //检查状态
      this.checkActive();
    },
    methods: {
      checkActive() {
        var that = this;
        that.dataList = [];
        this.text.forEach(function (e, i) {
          switch (that.activeStatu) {
            case 1:
              if (i <= 0) {
                that.dataList.push({
                  text: e,
                  active: true
                })
              } else {
                that.dataList.push({
                  text: e,
                  active: false
                })
              }
              break;
            case 2:
              if (i <= 1) {
                that.dataList.push({
                  text: e,
                  active: true
                })
              } else {
                that.dataList.push({
                  text: e,
                  active: false
                })
              }
              break;
            case 3:
              that.dataList.push(
                {
                  text: e,
                  active: true
                }
              )
              break;
            default:
              that.dataList.push({
                text: e,
                active: false
              })

          }
          if (that.activeStatu === 1) {


          } else if (that.activeStatu === 2) {

          } else if (that.activeStatu === 3) {

          }
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .yk-step {
    padding: 20px;
    padding-right: 0;
    height: 32px;
    line-height: 1.2;
    .yk-step-list {
      height: 32px;
      line-height: 1.2;
      .step-list-item {
        font-family: PingFangSC-Regular;
        font-size: 28px;
        margin-left: 20px;
        float: left;
        letter-spacing: 0;
        color: #9CA7B6;
        .item-text-icon {
          display: inline-block;
          width: 32px;
          height: 32px;
          color: #fff;
          text-align: center;
          background-color: #9CA7B6;
          border-radius: 100%;
        }
        & > .item-text-direction {
          margin-left: 20px;
        }
        & > .item-text-direction  .icon-arrow-right {
          font-weight: 600;
          line-height: 1.3;
          &:before{content: ">";}
        }
      }
      .is-active {
        color: #3399FF;
        & > .item-text-icon {
          background-color: #3399FF;
          
        }
        & > .item-text-direction .icon-arrow-right {
          color: #3399FF;
          
        }
      }
    }
  }

</style>
