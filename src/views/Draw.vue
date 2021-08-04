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
      <canvas id="canvas" width="720" height="480" />
      <div class="buttons">
        <div v-if="opened" class="picker-bg" @click="closePicker" />
        <ColorPicker
          v-if="opened"
          class="picker"
          theme="dark"
          @changeColor="changeColor"
        />
        <div
          class="color"
          :style="`--color: ${color}`"
          @click="openColorPicker"
        />
        <input type="range" v-model="thickness" min="1" max="60" step="1" />
      </div>
      <div class="buttons">
        <span class="button red" @click="submitButton">모두 지우기</span>
        <span class="button blue" @click="submitButton">되돌리기</span>
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
      thickness: 2,
      color: "rgba(0, 0, 0, 1)",
      opened: false,
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
  background: white;
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
