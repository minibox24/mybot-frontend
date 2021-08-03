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
  </div>
</template>


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
  margin-bottom: 5rem;
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

@media (max-width: 1100px) {
  .draw {
    padding: 0 10vw;
  }
}

@media (max-width: 700px) {
  .draw {
    padding: 0 30px;
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
