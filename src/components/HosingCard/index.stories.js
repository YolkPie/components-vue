import {
	storiesOf
} from "@storybook/vue";
import HosingCard from '.'
import {
	withKnobs
} from "@storybook/addon-knobs";

storiesOf("业务组件|House", module)
	.addDecorator(withKnobs)
	.add("HosingCard 房源卡片", () => {
		return {
            components: {
              HosingCard
            },
            template: `<HosingCard @click="handleCardClickMd" :cardinfo="cardinfo" />`,
            data() {
              return {
                cardinfo: {
                  "addressLat": "22.779997",
                  "addressLon": "113.520807",
                  "buildYear": "2014",
                  "channelId": 121074,
                  "cityAreaCode": 50259,
                  "cityAreaName": "南沙区",
                  "cityCode": 1601,
                  "cityName": "广州市",
                  "estateType": "住宅",
                  "fitmentType": "毛坯",
                  "floorLabel": "高楼层",
                  "hall": 2,
                  "housePutawayTime": "2021-01-29",
                  "houseResourceId": 285565462248799,
                  "houseStatus": 1,
                  "houseTerm": "满两年",
                  "houseTypePics": ["jfs/t1/165665/11/5466/66184/6013a569Ea0ca4561/858c94ae487e9a9e.jpg"],
                  "houseUpdateTime": "2021-01-29",
                  "kitchen": 0,
                  "locationFloor": 0,
                  "mainPic": "jfs/t1/156659/21/7936/132661/6013a569E4637a439/2611218082507225.jpg",
                  "orientation": "东南",
                  "plotAddress": "广州市南沙区凤凰大道外国语学院旁",
                  "plotId": 33072101,
                  "plotName": "南沙金茂湾",
                  "plotNamePinyin": "nashajinmaowan",
                  "rateDate": "2021-01-29",
                  "room": 3,
                  "structureArea": 95,
                  "title": "南沙金茂湾 3室2厅1卫【好房京选】",
                  "titlePinyin": "nashajinmaowan 3shi2ting1wei【haofangjingshua】",
                  "toilet": 0,
                  "totalFloor": 0,
                  "totalPrice": 330,
                  "tradingAreaId": 97101,
                  "tradingAreaName": "金洲",
                  "unitPrice": 34737
                }
              }
            },
            methods: {
              handleCardClickMd() {
                console.log('Click Me')
              }
            }
		}
	})