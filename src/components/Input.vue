<template>
  <div class="input-wrapper">
    <span class="label">{{ label }}</span>
    <input class="input" :value="modelValue" @input="input" />
  </div>
</template>

<script>
export default {
  props: { label: String, modelValue: String },
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
  align-items: center;
}

.label {
  width: 20rem;
  font-size: 1.5rem;
}

.input {
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

.input:focus {
  border-color: #5865f2;
}
</style>
