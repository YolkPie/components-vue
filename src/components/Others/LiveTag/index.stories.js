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
            { code: "preplay", label: "预告中", value: 1, subLabel: 159837 },
            { code: "playing", label: "直播中", value: 2, subLabel: 20 },
            { code: "replay", label: "回放", value: 3, subLabel: 40 },
            { code: "will", label: "即将开播", value: 4, subLabel: "" }
          ]
				};
			},
      template: `
        <div>
          <YolkLiveTag v-for="item in liveList" :key="item.value" :liveData="item"></YolkLiveTag>
        </div>
        `,
		}
	})
