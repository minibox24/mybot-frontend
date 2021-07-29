<template>
  <div class="input-wrapper">
    <span class="label" :style="`--width: ${width}rem`">{{ label }}</span>
    <textarea
      v-if="isTextArea"
      class="input textarea scroll"
      :value="modelValue"
      @input="input"
    />
    <input v-else class="input" :value="modelValue" @input="input" />
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    modelValue: String,
    width: Number,
    isTextArea: Boolean,
  },
  methods: {
    input(value) {
      this.$emit("update:modelValue", value.target.value);
    },
  },
};
</script>

<style scoped>
.input-wrapper {
  display: flex;
}

.label {
  margin-top: 7px;
  min-width: 5rem;
  width: var(--width);
  font-size: 1.5rem;
}

.input {
  font-family: "Noto Sans KR", sans-serif;
  font-weight: lighter;

  margin-left: 0.5rem;
  padding: 10px;
  width: 100%;
  height: 30px;
  border: 1px solid #12121a;
  border-radius: 3px;
  transition: 0.17s;
  outline: none;
  background: #2f3136;
  color: white;
  font-size: 1.2rem;
}

.textarea {
  resize: none;
  height: 120px;
}

.textarea::-webkit-scrollbar {
  width: 12px;
}

.textarea::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 12px 12px #202225;
  border-radius: 12px;
  border: solid 3px transparent;
}

.textarea::-webkit-scrollbar-corner {
  background: #2f3136;
}

.input:focus {
  border-color: #5865f2;
}
</style>
