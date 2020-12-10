import { storiesOf } from "@storybook/vue";
import StatusBar from "../src/components/Follow/StatusBar/StatusBar";
import ProductItem from "../src/components/Follow/ProductItem/ProductItem";
import ShopItem from "../src/components/Follow/ShopItem/ShopItem";
import AlbumItem from "../src/components/Follow/AlbumItem/AlbumItem";
import { withKnobs } from "@storybook/addon-knobs";
import "../src/components/Follow/public/css/_reset.less";

storiesOf("Follow", module)
  .addDecorator(withKnobs)
  .add("拍品状态", () => {
    return {
      components: { StatusBar },
      template: `<status-bar :start-time="1606829123000" :end-time="3606829423000" :auction-status="1"></status-bar>`,
    };
  })
  .add("关注的拍品", () => {
    return {
      components: { ProductItem },
      data() {
        return {
          product: {
            paimaiId: 157475120,
            image:
              "jfs/t1/149696/10/11483/72530/5f8f8eecE453a2497/aa3859c29d07b968.jpg",
            title: "测试拍品--paimaitest创建升价拍不延时商品",
            startTime: 1606829123000,
            endTime: 1606829423000,
            currentPrice: 1,
            currentPriceStr: "1",
            status: 2,
            displayStatus: 1,
            isTop: 0,
            accessNum: 2,
          },
        };
      },
      template: `<product-item :item="product" :key="product.paimaiId"></product-item>`,
    };
  })
  .add("关注的店铺", () => {
    return {
      components: { ShopItem },
      data() {
        return {
          shop: {
            shopId: 793026,
            vendorId: 797004,
            title: "荣耀紫砂陶瓷",
            isTop: 0,
            productCount: 67,
            products: [
              {
                paimaiId: 169394488,
                image:
                  "jfs/t1/150162/22/15390/112379/5fbb4863E39898418/1c133c31170c0648.jpg",
              },
              {
                paimaiId: 169394842,
                image:
                  "jfs/t1/123109/40/19756/122270/5fbb4693E063cd86c/2825515f26a00843.jpg",
              },
              {
                paimaiId: 167733801,
                image:
                  "jfs/t1/116625/28/14230/160515/5f26d237Eb7c60934/80e5cbe5277981d5.jpg",
              },
              {
                paimaiId: 167733782,
                image:
                  "jfs/t1/119168/29/13741/126711/5f26d04fE0e98672e/b8b341923d82b62f.jpg",
              },
            ],
          },
        };
      },
      template: `<shop-item :item="shop" :key="shop.shopId"></shop-item>`,
    };
  })
  .add("关注的专场", () => {
    return {
      components: { AlbumItem },
      data() {
        return {
          album: {
            albumId: 2538043,
            image:
              "jfs/t1/148182/8/12933/203137/5f9fe5b9E59a60543/8814007c138eab6b.jpg",
            title: "水墨篆刻",
            vendorName: "泽众",
            startTime: 1607230800000,
            endTime: 1607436000000,
            status: 1,
          },
        };
      },
      template: `<album-item :item="album" :key="album.albumId"></album-item>`,
    };
  });
