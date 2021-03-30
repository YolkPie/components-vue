import { storiesOf } from "@storybook/vue";
import YolkLiveTag from ".";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|Others", module)
	.addDecorator(withKnobs)
	.add("LiveTag 直播标签", () => {
		return {
			components: { YolkLiveTag },
      data() {
				return {
					liveList: [
            { code: "preplay", label: "预告中", value: 1, startTime: 1822977701000 },
            { code: "playing", label: "直播中", value: 2, viewNum: 20 },
            { code: "replay", label: "回放", value: 3, viewNum: 40 },
            { code: "willPlay", label: "即将开播", value: 4, viewNum: "" }
          ]
				};
			},
      template: `
        <div>
          <YolkLiveTag :liveList="liveList" :liveValue="1" @countEnd="onCountEnd"></YolkLiveTag>
          <YolkLiveTag :liveList="liveList" :liveValue="2" @countEnd="onCountEnd"></YolkLiveTag>
          <YolkLiveTag :liveList="liveList" :liveValue="3" @countEnd="onCountEnd"></YolkLiveTag>
          <YolkLiveTag :liveList="liveList" :liveValue="4" @countEnd="onCountEnd"></YolkLiveTag>
        </div>
        `,
      methods:{
        onCountEnd(){
          this.liveValue = 4;
          console.log('倒计时结束，5秒后刷新数据')
          setTimeout(() => {
            console.log('ajax refresh data')
          }, 1000 * 5);
        }
      }
		}
	})
