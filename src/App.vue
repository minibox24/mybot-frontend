<template>
  <router-view />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;900&display=swap");

body {
  margin: 0;
  font-family: "Noto Sans KR", sans-serif;
}

#app {
  height: 100vh;
  background: #2f3739;
  color: white;

  user-select: none;
}

img {
  -webkit-user-drag: none;
}

.scroll::-webkit-scrollbar {
  width: 12px;
}

.scroll::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 12px 12px #202225;
  border-radius: 12px;
  border: solid 3px transparent;
}
</style>
