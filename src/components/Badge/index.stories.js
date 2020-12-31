import { storiesOf } from "@storybook/vue";
import YolkBadge from ".";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("基础组件|Badge", module)
	.addDecorator(withKnobs)
	.add("Badge", () => {
		return {
			components: { YolkBadge },
      template: `<div style="padding: 20px">
        <YolkBadge type="primary">30</YolkBadge>
        <YolkBadge type="error">10</YolkBadge>
        <YolkBadge type="success">10</YolkBadge>
        <YolkBadge type="warning">10</YolkBadge>
        <br/>
        <br/>
        <YolkBadge size="small">30</YolkBadge>
        <YolkBadge size="normal">10</YolkBadge>
        <YolkBadge size="large">10</YolkBadge>
        <br/>
        <br/>
        <YolkBadge size="small" color="#888">自定义颜色</YolkBadge>
        </div>`,
		}
	})
