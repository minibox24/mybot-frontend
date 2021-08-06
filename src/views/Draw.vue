<template>
  <div class="draw">
    <div class="header">
      <span class="title">그림판</span>
      <div class="user">
        <span class="user-name">{{ user.name }}</span>
        <img class="user-avatar" alt="avatar" :src="user.avatar" />
      </div>
    </div>
    <div class="control">
      <canvas
        ref="canvas"
        id="canvas"
        width="720"
        height="480"
        :style="`z-index: ${suck.ing ? 50 : ''}`"
        @mousedown="canvasMouseDown"
        @mouseup="canvasMouseUp"
        @mouseleave="canvasMouseUp"
        @mousemove="canvasMouseMove"
        @touchstart="canvasTouchStart"
        @touchend="canvasTouchEnd"
        @touchcancel="canvasTouchEnd"
        @touchmove="canvasTouchMove"
        @click="suckerClick"
        @touch="suckerClick"
      />
      <div class="buttons">
        <div v-if="opened || suck.ing" class="picker-bg" @click="closePicker" />
        <div
          v-if="suck.ing"
          class="color-bubble"
          :style="`left: ${suck.x}px; top: ${suck.y}px; background: ${suck.color}`"
        />
        <ColorPicker
          v-if="opened"
          class="picker"
          theme="dark"
          :color="color"
          @changeColor="changeColor"
        />
        <div
          class="color"
          :style="`--color: ${color}; z-index: ${suck.ing ? 50 : ''}`"
          @click="openColorPicker"
        />
        <svg
          @click="openSucker"
          :class="`sucker ${suck.ing ? 'active' : ''}`"
          :style="`z-index: ${suck.ing ? 50 : ''}`"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-8 -8 40 40"
        >
          <path
            d="M13.1,8.2l5.6,5.6c0.4,0.4,0.5,1.1,0.1,1.5s-1.1,0.5-1.5,0.1c0,0-0.1,0-0.1-0.1l-1.4-1.4l-7.7,7.7C7.9,21.9,7.6,22,7.3,22H3.1C2.5,22,2,21.5,2,20.9l0,0v-4.2c0-0.3,0.1-0.6,0.3-0.8l5.8-5.8C8.5,9.7,9.2,9.6,9.7,10s0.5,1.1,0.1,1.5c0,0,0,0.1-0.1,0.1l-5.5,5.5v2.7h2.7l7.4-7.4L8.7,6.8c-0.5-0.4-0.5-1-0.1-1.5s1.1-0.5,1.5-0.1c0,0,0.1,0,0.1,0.1l1.4,1.4l3.5-3.5c1.6-1.6,4.1-1.6,5.8-0.1c1.6,1.6,1.6,4.1,0.1,5.8L20.9,9l-3.6,3.6c-0.4,0.4-1.1,0.5-1.5,0.1"
          ></path>
        </svg>
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
    <span class="button green done" @click="done">완성</span>
  </div>
</template>

<script>
import { ColorPicker } from "vue-color-kit";
import axios from "axios";

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
      history: [],
      processing: false,
      user: {
        name: "",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      suck: {
        ing: false,
        color: "rgba(0, 0, 0, 1)",
        x: 0,
        y: 0,
      },
      paths: [],
    };
  },
  methods: {
    openColorPicker() {
      this.opened = true;
    },
    closePicker() {
      this.opened = false;
      this.suck.ing = false;
    },
    changeColor(color) {
      this.color = `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${color.rgba.a})`;
    },
    changeThickness(event) {
      this.ctx.lineWidth = event.target.value;
    },
    canvasMouseDown({ clientX, clientY }) {
      if (this.suck.ing) return;

      const { x, y } = this.getPosition(clientX, clientY);

      this.painting = true;
      this.paths.push([{ x, y }]);
    },
    canvasMouseUp() {
      this.ctx.closePath();

      if (this.painting) {
        this.history.push(
          this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
        );
      }

      this.painting = false;
    },
    canvasMouseMove({ clientX, clientY }) {
      this.suckerMove({ clientX, clientY });

      if (!this.painting) return;

      const pos = this.getPosition(clientX, clientY);
      this.paths[this.paths.length - 1].push(pos);
      this.refresh();
    },
    refresh() {
      this.resetCanvas();

      for (let i = 0; i < this.paths.length; ++i) {
        const path = this.paths[i];

        if (path.length < 1) continue;

        this.ctx.beginPath();
        this.ctx.moveTo(path[0].x, path[0].y);

        for (let j = 1; j < path.length; ++j) {
          this.ctx.lineTo(path[j].x, path[j].y);
        }

        this.ctx.stroke();
      }
    },
    canvasTouchStart(event) {
      event.preventDefault();

      const { clientX, clientY } = event.touches[0];

      const mouseEvent = new MouseEvent("mousedown", {
        clientX,
        clientY,
      });

      this.canvas.dispatchEvent(mouseEvent);
      this.suckerClick({ clientX, clientY });
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
      const { left, top, width, height } = this.canvas.getBoundingClientRect();

      const scaleX = this.canvas.width / width;
      const scaleY = this.canvas.height / height;

      return {
        x: (clientX - left) * scaleX,
        y: (clientY - top) * scaleY,
      };
    },
    resetCanvas() {
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
    clear() {
      this.history.push(
        this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
      );
      this.resetCanvas();
    },
    undo() {
      const imageData = this.history.pop();

      if (!imageData) return;

      this.ctx.putImageData(
        imageData,
        0,
        0,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    },
    async done() {
      if (this.processing) return;

      this.processing = true;
      const { status } = await axios
        .post(`/paint?token=${this.$route.query.token}`, {
          image: this.canvas
            .toDataURL()
            .replace(/^data:image\/\w+;base64,/, ""),
        })
        .catch(() => {
          alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
          this.processing = false;
        });

      if (status === 200) {
        this.$router.push("/done");
      }
    },
    suckerMove({ clientX, clientY }) {
      if (this.suck.ing) {
        this.suck.x = clientX + 10;
        this.suck.y = clientY - 30;

        const { x, y } = this.getPosition(clientX, clientY);
        const rgb = this.ctx.getImageData(x, y, 1, 1).data;

        this.suck.color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
      }
    },
    suckerClick({ clientX, clientY }) {
      if (this.suck.ing) {
        const { x, y } = this.getPosition(clientX, clientY);
        const rgb = this.ctx.getImageData(x, y, 1, 1).data;

        this.color = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 1)`;
      }
    },
    openSucker() {
      this.suck.ing = !this.suck.ing;
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
  async mounted() {
    const token = this.$route.query.token;

    if (!token) {
      // return this.$router.push("/");
    }

    this.canvas = this.$refs.canvas;
    this.ctx = this.canvas.getContext("2d");

    this.resetCanvas();

    this.history.push(
      this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
    );

    const { status, data } = await axios
      .get(`/paint?token=${token}`)
      .catch(() => {
        // this.$router.push("/");
      });

    if (status === 200) {
      this.user.name = data.userName;
      this.user.avatar = data.userAvatar;
    }
  },
};
</script>

<style src="../assets/color-picker.css"></style>

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
  align-items: center;
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
  z-index: 80;
}

.color {
  width: 50px;
  height: 25px;
  border-radius: 1rem;
  background: var(--color);
  border: 1px solid black;
  cursor: pointer;
}

.sucker {
  margin-left: 0.1rem;
  margin-right: 0.5rem;
}

.color-bubble {
  position: absolute;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: rgb(0 0 0 / 16%) 0px 0px 8px 0px;
  z-index: 100;
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
