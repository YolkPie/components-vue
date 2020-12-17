<template>
  <div class="horizontal-scorll-box" ref="horizontalScroll">
    <div class="type-filter" v-if="rules.length">
      <ul class="type-filter-ul" ref="takeRuleScorll">
        <li
          class="type-item"
          :class="{ itemcur: item.focus }"
          v-show="ruleContant[index]"
          v-for="(item, index) in rules"
          :key="`${index}_rules`"
          @click="(e) => typeclick(e, index)"
        >
          {{ item.name }}
        </li>
      </ul>
    </div>

    <div class="commission-info-box">
      <div v-html="ruleContant[filterItem]"></div>
      <!-- <slot v-if="rules[filterItem].slot" :name="rules[filterItem].slot"></slot> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rulesinfo: {
      type: [Object, Array],
      default: () => {},
    },
    rules: {
      type: Array,
      default: () => [
        {
          name: "在线确客规则",
          focus: true,
        },
        {
          name: "报备有效期",
          focus: false,
        },
        {
          name: "报备说明",
          focus: false,
        },
        {
          name: "报备说明",
          focus: false,
        },
        {
          name: "报备带看间隔",
          focus: false,
        },
        {
          name: "带看权益保护期",
          focus: false,
        },
        {
          name: "带看说明",
          focus: false,
        },
        {
          name: "结佣规则",
          focus: false,
        },
        {
          name: "项目支持",
          focus: false,
        },
      ],
    },
  },
  data() {
    return {
      ruleContant: [],
      filterItem: 0,
    };
  },
  watch: {
    rulesinfo: {
      handler(val) {
        this.initViewData(val);
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.initViewData();
  },
  methods: {
    initViewData(data) {
      if (!data) return;
      if (Array.isArray(data)) {
        this.ruleContant = data;
      } else {
        const {
          onlineConfirmCustomer, // 在线确客规则
          reportValidityPeriod, // 报备有效期
          reportNote, // 报备说明
          reportTakeLookInterval, // 报备带看间隔
          takeLookRightsPeriod, // 带看权益保护期
          takeLookNote, // 带看说明
          commissionRules, // 结佣规则
          projectSupport, // 项目支持
        } = data;
        this.ruleContant = [
          onlineConfirmCustomer, // 在线确客规则
          reportValidityPeriod, // 报备有效期
          reportNote, // 报备说明
          reportTakeLookInterval, // 报备带看间隔
          takeLookRightsPeriod, // 带看权益保护期
          takeLookNote, // 带看说明
          commissionRules, // 结佣规则
          projectSupport, // 项目支持
        ];
      }

      this.ruleContant.some((item, index) => {
        if (item) {
          this.filterItem = index;
          this.$set(this.rules[index], "focus", true);
          return true;
        }
      });
    },
    // 判断遮挡，进行滚动条动态滚动
    initScroll(e) {
      const { target } = e;
      const { clientWidth, offsetLeft } = target;
      const scorll = this.$refs.takeRuleScorll;
      if (target.getBoundingClientRect) {
        // 如果支持 getBoundingClientRect
        const detail = target.getBoundingClientRect();
        const { width, left } = detail;
        const clientWidth = this.$refs.horizontalScroll.clientWidth;
        if (left < 0) {
          scorll.scrollLeft += left - 14;
        }
        if (width + left > clientWidth - 15) {
          scorll.scrollLeft += width + left - (clientWidth - 15);
        }
        return;
      }

      if (clientWidth + offsetLeft > clientWidth - 15) {
        scorll.scrollLeft = clientWidth + offsetLeft - (clientWidth - 15);
      }
      if (offsetLeft == 15 && scorll.scrollLeft !== 0) {
        scorll.scrollLeft = 0;
      }
    },
    // 点击切换导航
    typeclick(e, index) {
      this.initScroll(e);

      this.filterItem = index;
      this.rules.forEach((f) => {
        this.$set(f, "focus", false);
      });
      this.$set(this.rules[index], "focus", true);
    },
  },
};
</script>

<style lang="less" scoped>
.px2rem(@name, @px) {
  @{name}: unit(@px / 50, rem);
}
.horizontal-scorll-box {
  width: 100%;
}
.type-filter {
  padding: 0 0.3rem;
  border-bottom: 1px solid rgba(227, 229, 233, 1);
  .type-filter-ul {
    // padding-bottom: 0.2rem;
    overflow-x: scroll;
    scrollbar-base-color: #ff6600;
    display: flex;

    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
    .type-item {
      cursor: pointer;
      text-align: center;
      padding: 0.3rem 0.1rem 0.15rem;
      margin-right: 0.1rem;
      font-size: 0.28rem;
      color: #424854;
      vertical-align: top;
      display: inline-block;

      flex-shrink: 0;
      &.itemcur {
        position: relative;
      }
      &.itemcur::after {
        content: "";
        position: absolute;
        .px2rem(width, 42);
        .px2rem(height, 2);
        background-color: #c7a26a;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }
      // &.itemcur {
      //   border-bottom: 0.04rem solid #c7a26a;
      //   color: #c7a26a;
      // }
    }
  }
}

.commission-info-box {
  .px2rem(padding, 15);
  box-sizing: border-box;
  .px2rem(min-height, 91);
  // border-bottom: 1px solid rgba(227, 229, 233, 1);
  position: relative;
  .px2rem(padding-bottom, 25);

  .foldbtn {
    position: absolute;
    bottom: 0;
    right: 0.2rem;
    padding: 0.2rem 0.3rem;
    .foldbtn-arrow {
      display: inline-block;
      vertical-align: middle;
      width: 0rem;
      height: 0rem;
      border-style: solid;
      border-width: 0 0.12rem 0.16rem 0.12rem;
      border-color: transparent transparent #848689 transparent;
      margin-right: 0.1rem;
    }
    .foldbtn-sp {
      display: inline-block;
      vertical-align: middle;
    }
  }

  .commission-form-box {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    .px2rem(margin-top, 12);
    &:nth-child(1) {
      margin-top: 0;
    }
    .commission-form-label {
      color: #848689;
      .px2rem(font-size, 13);
      .px2rem(line-height, 18);
      .px2rem(width, 94);
      font-family: PingFangSC-Regular;
      flex-shrink: 0;
    }
    .bootlabel {
      color: rgba(66, 72, 84, 1);
    }
    .commission-form-value {
      width: calc(100%-68px);
      word-wrap: break-word;
      .px2rem(line-height, 18);
      font-family: PingFangSC-Regular;
      .px2rem(font-size, 13);
      color: rgba(66, 72, 84, 1);
    }
    .bootvalue {
      color: rgba(255, 77, 61, 1);
    }
  }
}
</style>
