import { storiesOf } from '@storybook/vue'
import YolkSkeleton from '.'
import { withKnobs } from '@storybook/addon-knobs'

storiesOf("基础组件|Others", module)
    .addDecorator(withKnobs)
    .add('YolkSkeleton 骨架屏', () => {
        return {
            components: {YolkSkeleton},
            data() {
                return {
                    loading: true
                }
            },
            methods: {
                handleClick() {
                    this.loading = !this.loading
                }
            },
            template: `<div style="padding: 20px; box-sizing: border-box;">
                <button style="border: 1px solid black;margin-bottom: 40px;" @click="handleClick">{{loading ? 'loading' : 'down'}}</button>
                <YolkSkeleton title avatar :row="3" :loading="loading">
                    <div>加载完成后展示</div>
                </YolkSkeleton>
                <YolkSkeleton title :row="3" :loading="loading">
                    <div>加载完成后展示</div>
                </YolkSkeleton>
                <YolkSkeleton :row="3" :loading="loading">
                    <div>加载完成后展示</div>
                </YolkSkeleton>
            </div>`
        }
    })