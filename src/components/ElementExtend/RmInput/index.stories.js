import { storiesOf } from "@storybook/vue";
import RmInput from ".";
import { withKnobs } from "@storybook/addon-knobs";

storiesOf("Element扩展|RmableInput", module)
	.addDecorator(withKnobs)
	.add("可增减input", () => {
		return {
			components: { RmInput },
      data() {
				return {
        };
			},
      template: `
        <div style="padding: 1rem .6rem;">
          <RmInput ref="refPhone" required type="phone" placeholder="请输入电话"></RmInput>
          <RmInput ref="refEmail" type="email" placeholder="请输入邮箱地址"></RmInput>

          <button style="font-size:.24rem; margin-top:1rem;padding:.1rem;" @click="getData">获取输入内容</button>
        </div>
        `,
      mounted(){
      },
      methods:{
        getData(){
          // // 单独调用校验
          // this.$refs.refPhone.validate().then(vaild => {
          //   if(!vaild){
          //     alert('校验失败，页面标红提示')
          //   }

          //   alert('校验通过')
          // })

          // // 校验并返回结果
          // this.$refs.refPhone.getData().then(phone => {
          //   alert(phone)
          // })

          // 同时校验多个控件
          Promise.all([this.$refs.refPhone.validate(),
            this.$refs.refEmail.validate()]).then(valids => {
            if(valids.includes(false)){
              alert('请完善信息')
              return
            }

            Promise.all([
              this.$refs.refPhone.getData(),
              this.$refs.refEmail.getData()
            ]).then(data => {
              let [phone, mail] = data
              alert('phone:'+ phone)
              alert('Email:'+ mail)
            })
          })
        }
      }
		}
	})
