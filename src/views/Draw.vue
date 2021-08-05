<template>
  <div class="draw">
    <div class="header">
      <span class="title">그림판</span>
      <div class="user">
        <span class="user-name">yejun</span>
        <img
          class="user-avatar"
          alt="avatar"
          src="https://cdn.discordapp.com/avatars/310247242546151434/3bc87392aa69fe30a659f72151062458.png"
        />
      </div>
    </div>
    <div class="control">
      <canvas
        ref="canvas"
        id="canvas"
        @mousedown="canvasMouseDown"
        @mouseup="canvasMouseUp"
        @mouseleave="canvasMouseUp"
        @mousemove="canvasMouseMove"
        @touchstart="canvasTouchStart"
        @touchend="canvasTouchEnd"
        @touchcancel="canvasTouchEnd"
        @touchmove="canvasTouchMove"
      />
      <div class="buttons">
        <div v-if="opened" class="picker-bg" @click="closePicker" />
        <ColorPicker
          v-if="opened"
          class="picker"
          theme="dark"
          :color="color"
          @changeColor="changeColor"
        />
        <div
          class="color"
          :style="`--color: ${color}`"
          @click="openColorPicker"
        />
        <input
          type="range"
          class="track"
          :style="`--gradient: linear-gradient(to right, #5865f2 0%, #5865f2 ${
            (thickness / 200) * 100
          }%, #4f545c ${(thickness / 200) * 100}%, #4f545c 100%)`"
          v-model="thickness"
          min="1"
          max="200"
          step="1"
        />
      </div>
      <div class="buttons">
        <span class="button red" @click="clear">모두 지우기</span>
        <span class="button blue" @click="undo">되돌리기</span>
      </div>
    </div>
    <span class="button green done" @click="submitButton">완성</span>
  </div>
</template>

<script>
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";

export default {
  components: { ColorPicker },
  data() {
    return {
      canvas: null,
      ctx: null,
      color: "rgba(0, 0, 0, 1)",
      thickness: 2,
      opened: false,
      painting: false,
      oldSize: {
        width: null,
        height: null,
      },
      history: [],
    };
  },
  methods: {
    openColorPicker() {
      this.opened = true;
    },
    closePicker() {
      this.opened = false;
    },
    changeColor(color) {
      this.color = `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${color.rgba.a})`;
    },
    changeThickness(event) {
      this.ctx.lineWidth = event.target.value;
    },
    canvasMouseDown({ clientX, clientY }) {
      const { x, y } = this.getPosition(clientX, clientY);

      this.ctx.beginPath();
      this.ctx.moveTo(x, y);
      this.painting = true;
    },
    canvasMouseUp() {
      this.ctx.closePath();

      this.painting = false;

      this.history.push(
        this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      );
    },
    canvasMouseMove({ clientX, clientY }) {
      if (!this.painting) return;

      const { x, y } = this.getPosition(clientX, clientY);

      this.ctx.lineTo(x, y);
      this.ctx.stroke();
    },
    canvasTouchStart(event) {
      event.preventDefault();

      const { clientX, clientY } = event.touches[0];

      const mouseEvent = new MouseEvent("mousedown", {
        clientX,
        clientY,
      });

      this.canvas.dispatchEvent(mouseEvent);
    },
    canvasTouchEnd(event) {
      event.preventDefault();

      const mouseEvent = new MouseEvent("mouseup", {});

      this.canvas.dispatchEvent(mouseEvent);
    },
    canvasTouchMove(event) {
      event.preventDefault();

      const { clientX, clientY } = event.touches[0];

      const mouseEvent = new MouseEvent("mousemove", {
        clientX,
        clientY,
      });

      this.canvas.dispatchEvent(mouseEvent);
    },
    getPosition(clientX, clientY) {
      const { left, top } = this.canvas.getBoundingClientRect();

      return {
        x: clientX - left,
        y: clientY - top,
      };
    },
    resetCanvas() {
      this.oldSize = {
        width: this.$refs.canvas.width,
        height: this.$refs.canvas.height,
      };

      const rect = this.$refs.canvas.getBoundingClientRect();
      this.$refs.canvas.width = rect.width;
      this.$refs.canvas.height = rect.height;

      this.ctx.fillStyle = "white";
      this.ctx.fillRect(
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      );

      this.ctx.strokeStyle = this.color;
      this.ctx.lineWidth = this.thickness;

      this.ctx.lineJoin = "round";
      this.ctx.lineCap = "round";
    },
    resizeCanvas() {
      const image = new Image();

      image.onload = () => {
        this.resetCanvas();
        this.ctx.drawImage(
          image,
          0,
          0,
          this.$refs.canvas.width,
          this.$refs.canvas.height
        );
      };

      image.src = this.canvas.toDataURL();
    },
    clear() {
      this.history.push(
        this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      );
      this.resetCanvas();
    },
    undo() {
      this.ctx.putImageData(
        this.history[this.history.length - 1],
        0,
        0,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      this.history.pop();
    },
  },
  watch: {
    color(value) {
      this.ctx.strokeStyle = value;
    },
    thickness(value) {
      this.ctx.lineWidth = value;
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.resetCanvas();

    window.addEventListener("resize", this.resizeCanvas);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeCanvas);
  },
};
</script>

<style scoped>
.draw {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20vw;
  min-height: 100vh;
}

.header {
  display: flex;
  margin-bottom: 2rem;
  margin-top: 1rem;
}

.title {
  font-size: 3rem;
  font-weight: bold;
}

.user {
  display: flex;
  align-items: center;
  margin-left: auto;
}

.user-avatar {
  width: 50px;
  border-radius: 50%;
  margin-left: 0.5rem;
}

.control {
  margin: 0 5vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

#canvas {
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

.buttons {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}

.picker-bg {
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(10px);
}

.picker {
  position: absolute;
  top: calc(50% - 338px / 2);
}

.color {
  width: 50px;
  border-radius: 1rem;
  background: var(--color);
  border: 1px solid black;
  margin-right: 0.5rem;
}

.track {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: transparent;
  width: 160px;
  height: 16px;
}

.track:focus {
  outline: none;
}

.track::-webkit-slider-runnable-track {
  width: 100%;
  height: 8px;
  border: 0;
  border-radius: 4px;
  box-shadow: none;
  /*background-color: hsl(235, 85.6%, 64.7%);*/
  background-image: var(--gradient);
}

.track:focus::-webkit-slider-runnable-track {
  background-image: var(--gradient);
}

.track::-webkit-slider-thumb {
  -webkit-appearance: none;
  margin-top: -8px;
  border: 1px solid #dcddde;
  box-shadow: 0 3px 1px 0 rgb(0 0 0 / 5%), 0 2px 2px 0 rgb(0 0 0 / 10%),
    0 3px 3px 0 rgb(0 0 0 / 5%);
  width: 10px;
  height: 24px;
  border-radius: 3px;
  background-color: #fff;
  cursor: ew-resize;
}

.track::-moz-range-track {
  border: 0;
  box-shadow: none;
  background-color: #4f545c;
}

.track::-moz-range-track,
.track::-moz-range-progress {
  width: 100%;
  height: 8px;
  border-radius: 4px;
}

.track::-moz-range-thumb {
  border: 1px solid #dcddde;
  box-shadow: 0 3px 1px 0 rgb(0 0 0 / 5%), 0 2px 2px 0 rgb(0 0 0 / 10%),
    0 3px 3px 0 rgb(0 0 0 / 5%);
  width: 10px;
  height: 24px;
  border-radius: 3px;
  background-color: #fff;
  cursor: ew-resize;
}

.track::-moz-range-progress {
  background-color: hsl(235, 85.6%, 64.7%);
}

.button {
  text-align: center;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0.25rem;
  transition: 0.17s;
  border: none;
  outline: none;
  cursor: pointer;
}

.green {
  background: #3ba55d;
}

.green:hover {
  background: #2d7d46;
}

.green:active {
  background: #236136;
}

.blue {
  background: #5865f2;
}

.blue:hover {
  background: #4752c4;
}

.blue:active {
  background: #3c45a5;
}

.red {
  background: #ed4245;
}

.red:hover {
  background: #c03537;
}

.red:active {
  background: #a12d2f;
}

.done {
  margin-top: 2rem;
  margin-left: auto;
}

@media (max-width: 1100px) {
  .draw {
    padding: 0 10vw;
  }
}

@media (max-width: 700px) {
  .draw {
    padding: 0 30px;
  }

  .control {
    margin: 0;
  }
}

@media (max-width: 500px) {
  .header {
    margin-bottom: 2rem;
  }

  .user-name {
    display: none;
  }
}
</style>
