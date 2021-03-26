<template>
  <canvas
    id="canvas"
    @mousedown="startPosition"
    @mousemove="draw"
    @mouseup="finishedPosition"
  ></canvas>
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
      default: () => {}
    }
  },
  mounted() {
    this.initCanvas();
  },
  methods: {
    initCanvas() {
      const { height, width } = this.styleMessage || {}
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
#canvas {
  border: 2px solid black;
}
</style>