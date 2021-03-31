<template>
  <div class="draw-container">
    <canvas
      id="canvas"
      @mousedown="startPosition"
      @mousemove="draw"
      @mouseup="finishedPosition"
    ></canvas>
    <div class="draw-container__tool">
      <button class="draw-container__tool-button" @click="downloadFile">
        导出
      </button>
    </div>
  </div>
</template>
 <script>
export default {
  data() {
    return {
      ctx: null,
      painting: false,
    };
  },
  props: {
    styleMessage: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    downloadFile() {
      const canvas = document.querySelector("#canvas");
      const content = canvas.toDataURL("image/png");
      const download = document.createElement("a");
      download.setAttribute("href", content);
      download.setAttribute("download", "ewm.png");
      download.click();
    },
    initCanvas() {
      const { height, width } = this.styleMessage || {};
      const canvas = document.querySelector("#canvas");
      const ctx = canvas.getContext("2d");
      canvas.height = height || window.innerHeight;
      canvas.width = width || window.innerWidth;
      this.ctx = ctx;
    },
    startPosition(e) {
      this.painting = true;
      this.draw(e);
    },
    finishedPosition() {
      this.painting = false;
      this.ctx.beginPath();
    },
    draw(e) {
      if (!this.painting) return;
      this.ctx.lineWidth = 10;
      this.ctx.lineCap = "round";

      this.ctx.lineTo(e.clientX, e.clientY);
      this.ctx.stroke();
      this.ctx.moveTo(e.clientX, e.clientY);
    },
  },
};
</script>

 <style lang="less" scoped>
.draw-container {
  width: 100%;
  position: relative;
}
#canvas {
  border: 2px solid black;
}
.draw-container__tool {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 10px;
  box-sizing: border-box;
}
.draw-container__tool-button {
  padding: 10px;
  border: 1px solid black;
  cursor: pointer;
  border-radius: 50%;
}
</style>