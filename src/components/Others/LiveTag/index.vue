<template>
  <div class="yp-livetag">
    <span :class="'yp-livetag__statusbox yp-livetag__statusbox--' + curLiveData.code">
      <span class="yp-livetag__status">{{curLiveData.label}}</span>
    </span>
    <template v-if="timeCounter">
      <span class="yp-livetag__mark">{{timeCounter}}</span>
    </template>
    <template v-else-if="curLiveData.viewNum">
      <span class="yp-livetag__mark">{{curLiveData.viewNum}}人</span>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'LiveTag',
    data() {
      return {
        timeInterVal: null,
        timeCounter: null,
        curLiveData: {}
      }
    },
    props: {
      liveList: {
        type: Array,
        default: []
      },
      liveValue: Number
    },
    mounted() {
      this.curLiveData = this.liveList.find(item => item.value === this.liveValue) || {}
      if(this.curLiveData.startTime > 0){
        let leftTime = this.curLiveData.startTime - Date.now()
        this.timeCounter = this.formatStartTime(leftTime);
        this.timeInterVal && clearInterval(this.timeInterVal)
        this.timeInterVal = setInterval(() => {
          leftTime -= 1000;
          if(leftTime <= 0){
            clearInterval(this.timeInterVal)
            this.$emit('countEnd')
            return;
          }
          this.timeCounter = this.formatStartTime(leftTime);
        }, 1000)
      }
    },
    destroyed(){
      this.timeInterVal && clearInterval(this.timeInterVal)
    },
    methods: {
      formatStartTime(leftTime){
        let seconds = leftTime / 1000;
        let days = 0;
        let hours = 0;
        let min = 0;
        let sec = 0;
        if (seconds >= 86400) {
          days = Math.floor(seconds / 86400);
          seconds -= days * 86400;
        }
        if (seconds >= 3600) {
          hours = Math.floor(seconds / 3600);
          seconds -= hours * 3600;
        }
        if (seconds >= 60) {
          min = Math.floor(seconds / 60);
          seconds -= min * 60;
        }
        sec = Math.round(seconds);
       
        hours = hours > 9 ? hours : `0${hours}`;
        min = min > 9 ? min : `0${min}`;
        sec = sec > 9 ? sec : `0${sec}`;
        return  `${days > 0 ? days+'天 ': ''}${hours}:${min}:${sec}`
      }
    }
  }
</script>
<style lang="scss" scoped>
.yp-livetag {
  border-radius: 6px;
  height: 40px;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
}
.yp-livetag__statusbox--preplay {
  background-image: linear-gradient(#19b45e, #009b46);
}
.yp-livetag__statusbox--playing {
  background-image: linear-gradient(#f2140c, #f2270c, #f24d0c);
}
.yp-livetag__statusbox--replay {
  background-image: linear-gradient(#9c9c9c, #9c9c9c);
}
.yp-livetag__statusbox--willPlay {
  background-image: linear-gradient(#19b45e, #009b46);
}
.yp-livetag__statusbox {
  padding-right: 10px;
  padding-left: 10px;
  border-radius: 6px;
  height: 40px;
  display: flex;
  align-items: center;
  z-index: 1;
}
.yp-livetag__status {
  margin: 0px;
  padding: 0px;
  color: #fff;
  font-size: 24px;
  height: 40px;
  line-height: 40px;
  display: inline-block;
}

.yp-livetag__mark {
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 6px;
  height: 40px;
  line-height: 40px;
  font-size: 24px;
  padding: 0 6px 0 12px;
  margin-left: -7px;
  z-index: 0;
}
</style>
