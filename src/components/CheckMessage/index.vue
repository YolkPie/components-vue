<template>
  <div class="evaluate-checkbox">
    <div class="evaluate-checkbox_row" v-for="(item, index) in listData" :key="index">
      <div class="evaluate-checkbox_row-box" v-for="(i, inx) in item" :key="inx">
        <span :class="`evaluate-checkbox_row-box_btn ${i.isactive ? 'active' : ''}`" @click="handleChangeSelect(index, inx)">
          {{i.title}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    checkMessageData: {
      type: Array,
      default: () => [
        {
          title: '需求理解准确且全面',
          code: 0,
        },
        {
          title: '态度热情周到',
          code: 1
        },
        {
          title: '对楼盘情况了如指掌',
          code: 2
        },
        {
          title: '对政策解读到位',
          code: 3
        },
        {
          title: '待人真诚不虚伪',
          code: 4
        },
        {
          title: '回复及时有问必答',
          code: 5
        },
        {
          title: '带看行程合理',
          code: 6
        },
      ]
    },
    size: {
      type: [Number, String],
      default: 2
    },
    selectMessageData: {
      type: Array,
      default: () => []
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    checkMessageData: {
      handler(val) {
        this.listData = this.loadcheckMessageData(val, this.size)
      },
      immediate: true
    }
  },
  data() {
    return {
      listData: [],
      selectcode: []
    };
  },
  methods: {
    handleChangeSelect(index, inx) {
      if(this.disable) return
      const listData = this.listData
      let selectcode = this.selectcode
      const item = listData[index][inx]
      const { isactive, code } = item
      if(isactive) {
        selectcode = selectcode.filter(item => item !== code)
      } else {
        selectcode.push(code)
      }
      item.isactive = !isactive
      this.listData = [...listData]
      this.selectcode = selectcode
      this.$emit('handleChangeMessage', selectcode)
    },
    loadcheckMessageData(view, size = 2) {
      if(!view) return []
      const result = []
      view.forEach(item => {
        const length = result.length
        item.isactive = this.selectMessageData.includes(item.code + '')
        if(!length) {
          result[0] = []
          return result[0].push(item)
        }
        if(result[length - 1].length < size) return result[length - 1].push(item)
        result[length] = []
        result[length].push(item)
      })
      return result
    }
  }
};
</script>

<style lang="scss" scoped>
.evaluate-checkbox {
  width: 100%;
  height: auto;
  margin-top: .5rem;

  &_row {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: .22rem;
    padding: 0 .7rem;
    box-sizing: border-box;

    &:nth-child(1) {
      margin-top: 0;
    }

    &-box {
      width: 2.94rem;


      &_btn {
        color: #424854;
        font-size: .24rem;
        display: inline-block;

        width: 100%;
        height: .72rem;
        line-height: .72rem;
        text-align: center;
        border: 1px solid rgba(223,223,223,1);
        border-radius: .08rem;
        background: #fff;

        &.active {
          color: #BD914E;
          background: rgba(205,171,120,0.1);
          border: 1px solid rgba(189,145,78,1);
          border-radius: 8rpx;
        }
      }
    }
  }
}
</style>