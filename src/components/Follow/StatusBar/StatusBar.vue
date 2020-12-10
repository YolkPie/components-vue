<template>
  <div class="status" :class="status | getStatusCls">
    <b class="status__text">{{status | getStatusTxt}}</b>
<!--    <span class="status__time" v-if="status === 2">-->
<!--        <span>{{new Date(this.endTime).getMonth() + 1 | fill2Filter}}</span><span>月</span>-->
<!--        <span>{{new Date(this.endTime).getDate() | fill2Filter}}</span><span>日</span>-->
<!--        <span>{{new Date(this.endTime).getHours() | fill2Filter}}</span>-->
<!--        <span>:</span>-->
<!--        <span>{{new Date(this.endTime).getMinutes() | fill2Filter}}</span><span>结束</span>-->
<!--    </span>-->
    <span class="status__time" v-if="status !== 2">
      <span v-if="countdownTime.d !== '00'">{{countdownTime.d}}天</span>
      <span>{{countdownTime.h}}</span>
      <span>:</span>
      <span>{{countdownTime.m}}</span>
      <span>:</span>
      <span>{{countdownTime.s}}</span>
    </span>
  </div>
</template>
<script>
import { on, off, restTime, fill2 } from '../public/utils/tools'

export default {
  name: 'StatusBar',
  data () {
    return {
      restStartTime: null, // 距离开始时间
      restEndTime: null, // 距离结束时间
      countdownTime: {
        d: '--',
        h: '--',
        m: '--',
        s: '--'
      },
      status: 2
    }
  },
  props: {
    startTime: {
      type: [Number, String]
    },
    endTime: {
      type: [Number, String]
    },
    auctionStatus: {
      type: Number,
      default: 2
    }
  },
  watch: {
    restStartTime (newVal) {
      if (this.status === 0) {
        this.countdownTime = restTime(newVal)
      }
    },
    restEndTime (newVal) {
      if (this.status === 1) {
        this.countdownTime = restTime(newVal)
      }
    }
  },
  mounted () {
    // 如果是预展中或拍卖中
    this.status = this.auctionStatus
    if (this.status === 0 || this.status === 1) {
      const now = new Date().getTime()
      this.restStartTime = this.startTime - now
      this.restEndTime = this.endTime - now
      this.startCountDown()
    }
    on(document, 'visibilitychange', this.updateRestTime)
  },
  beforeDestroy () {
    off(document, 'visibilitychange', this.updateRestTime)
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  filters: {
    getStatusTxt (status) {
      switch (status) {
        case 0:
          return '预展中'
        case 1:
          return '拍卖中'
        case 2:
          return '已结束'
        default:
          return ''
      }
    },
    getStatusCls (status) {
      switch (status) {
        case 0:
          return 'status--todo'
        case 1:
          return 'status--doing'
        default:
          return ''
      }
    },
    fill2Filter (v) {
      return fill2(v)
    }
  },
  methods: {
    /**
     * 开始倒计时
     */
    startCountDown () {
      const countDown = () => {
        if (this.status === 0) {
          if (this.restStartTime >= 1000) {
            this.restStartTime -= 1000
            if (this.timer) {
              clearTimeout(this.timer)
            }
            this.timer = setTimeout(countDown, 1000)
          } else {
            const now = new Date().getTime()
            this.restStartTime = 0
            this.restEndTime = this.endTime - now
            this.status = 1
            if (this.timer) {
              clearTimeout(this.timer)
            }
            this.startCountDown()
          }
        }
        if (this.status === 1) {
          if (this.restEndTime >= 1000) {
            this.restEndTime -= 1000
            if (this.timer) {
              clearTimeout(this.timer)
            }
            this.timer = setTimeout(countDown, 1000)
          } else {
            this.status = 2
            if (this.timer) {
              clearTimeout(this.timer)
            }
          }
        }
      }
      countDown()
    },
    /**
     * 更新倒计时剩余时间
     */
    updateRestTime () {
      const now = new Date().getTime()
      this.restStartTime = this.startTime - now
      this.restEndTime = this.endTime - now
      this.startCountDown()
    }
  }
}
</script>
<style lang="less" scoped>
@import "../public/css/mixin";
.status {
  font-size: 0;
  height: 36px;
  line-height: 36px;
  background: @background;
  border-radius: 5px;
  overflow: hidden;

  &__text {
    display: inline-block;
    width: 90px;
    height: 36px;
    line-height: 38px;
    vertical-align: middle;
    font-size: 22px;
    color: @white;
    text-align: center;
    background-image: linear-gradient(90deg, @gray 4%, @gray-light 100%);
  }

  &__time {
    display: inline-block;
    font-family: JDZhengHT-EN-Regular;
    font-size: 0;
    height: 38px;
    line-height: 38px;
    vertical-align: sub;
    color: @default;
    padding: 0 16px;
    span {
      display: inline-block;
      font-size: 28px;
      vertical-align: middle;
    }
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
</style>
