<template>
  <div class="home">
    <div class="info">
      <img alt="Avatar" src="../assets/minibot.png" class="avatar" />
      <span class="title">미니봇</span>
    </div>
    <div class="btns">
      <a class="btn" href="https://minibox.xyz/invite" target="blank"
        >초대하기</a
      >
      <a class="btn" href="https://discord.gg/pbd2xXJ" target="blank"
        >서포트 서버</a
      >
      <a class="btn" href="https://minibox.xyz/vote" target="blank"
        >하트 누르기</a
      >
      <router-link class="btn" to="/graph">파이 그래프</router-link>
    </div>
  </div>
</template>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.info {
  display: flex;
  align-items: center;
}

.avatar {
  width: 300px;
  border-radius: 50px;
}

.title {
  font-weight: bold;
  font-size: 10rem;
  margin-left: 1rem;
}

.btns {
  display: flex;
  margin-top: 2rem;
}

.btn {
  text-decoration: none;
  color: white;
  background: #5865f2;
  min-width: 100px;
  text-align: center;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0.25rem;
  transition: 0.17s;
}

.btn:hover {
  background: #4752c4;
}

.btn:active {
  background: #3c45a5;
}

@media (max-width: 900px) {
  .info {
    flex-direction: column;
  }

  .avatar {
    width: 200px;
    border-radius: 25px;
  }

  .title {
    font-size: 4rem;
    margin-left: 0;
  }

  .btns {
    flex-direction: column;
  }
}
</style>
