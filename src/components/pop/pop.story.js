import { storiesOf } from "@storybook/vue";
import Pop from "./pop.vue";
storiesOf("Pop", module).add("pop", () => ({
  components: { Pop },
  template: `<div>
      <Pop></Pop>
</div>`
}));
