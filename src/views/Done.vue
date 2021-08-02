<template>
  <div class="done">
    <span class="title">완료</span>
    <span class="desc">이제 이 창을 닫으셔도 됩니다</span>
  </div>
</template>

<style scoped>
.done {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
}

.title {
  font-weight: bold;
  font-size: 3rem;
}

.desc {
  font-size: 1.5rem;
}
</style>
