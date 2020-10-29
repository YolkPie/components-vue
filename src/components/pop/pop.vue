<template>
  <div class="pop">
    <div class="title">确定删除该订单吗?</div>
    <div class="ext-title">删除的订单将不可恢复</div>
    <div class="btns">
      <div class="sure">确定</div>
      <div class="cancle">取消</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pop"
};
</script>

<style lang="scss">
@import "../../styles/variables/index";
.pop {
  position: fixed;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 300px;
  height: 150px;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  .title {
    font-size: 24px;
    font-weight: bold;
    color: #333;
    margin-bottom: 20px;
  }
  .ext-title {
    font-size: 20px;
    color: #ddd;
  }
  .btns {
    margin-top: 20px;
    width: 200px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 24px;
    .sure {
      color: #ff3333;
    }
    .cancle {
      color: #333;
    }
  }
}
</style>
