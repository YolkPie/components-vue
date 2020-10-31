<template>
  <div class="goods-wrap">
    <div class="goods-img-container">
      <img
        class="goods-img"
        src="https://img10.360buyimg.com/xstore/s300x300_jfs/t1/58975/29/29/372883/5cd29a87Ed5fe0ae4/6ff39f61d3b1a4d9.jpg!q70"
        alt=""
      />
    </div>
    <div class="goods-info">
      <div>
        <div class="goods-name">
          9.5新江诗丹顿 马耳他42005自动机械18K玫瑰金手表男表
        </div>
      </div>
      <div class="goods-price-ext-info">
        <div class="goods-price">
          <div class="price-flag">¥</div>
          <div class="price">12345</div>
        </div>
        <div class="goods-follow">
          999次围观
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-item",
};
</script>

<style lang="less" scoped>
.goods-wrap {
  display: flex;
  flex-direction: column;
  // flex: 1;
  width: 220px;
  height: 390px;
  padding-bottom: 20px;
  margin: 5px 4px;

  .goods-img-container {
    width: 220px;
    height: 220px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 10px;

    .goods-img {
      display: block;
      width: 210px;
      height: 210px;
    }
  }

  .goods-info {
    width: 200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex: 1;
    .goods-name {
      font-size: 24px;
      color: #262626;
      overflow: hidden;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;

      /*! autoprefixer: ignore next */
      -webkit-box-orient: vertical;
    }

    .goods-price-ext-info {
      .goods-price {
        color: #262626;
        font-weight: bold;
        padding-top: 20px;
        display: flex;
        align-items: baseline;
        flex-direction: row;

        .price-flag {
          font-size: 20px;
        }

        .price {
          font-size: 26px;
        }
      }

      .goods-follow {
        color: #878888;
        font-size: 22px;
      }
    }
  }
}
</style>
