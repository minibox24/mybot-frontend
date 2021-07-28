<template>
  <div class="create-bot">
    <div class="header">
      <span class="title">봇 만들기</span>
      <div class="user">
        <span class="user-name">Minibox#3332</span>
        <img
          class="user-avatar"
          alt="avatar"
          src="https://cdn.discordapp.com/avatars/310247242546151434/3bc87392aa69fe30a659f72151062458.png"
        />
      </div>
    </div>
    <div class="inputs">
      <Input label="아이디" v-model="id" />
      <Input label="이름" v-model="name" />
      <Input label="프리픽스" />
      <Input label="프로필 사진 URL" v-model="avatar" />

      <div class="preview">
        <span>미리보기</span>
        <Message style="margin-top: 0.5rem" :name="name" :avatar="avatar" />
      </div>
    </div>
    <div class="button-container">
      <span class="button">만들기</span>
    </div>
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import Message from "../components/Message.vue";

export default {
  components: { Input, Message },
  data() {
    return {
      id: "",
      name: null,
      prefix: "",
      avatar: "",
    };
  },
};
</script>

<style scoped>
.create-bot {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20vw;
  height: 100%;
}

.header {
  display: flex;
  margin-bottom: 5rem;
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

.inputs {
  margin: 0 5vw;
}

.inputs > * {
  margin-bottom: 1rem;
}

.preview {
  margin-top: 3rem;
}

.button-container {
  display: flex;
  margin-top: 2rem;
}

.button {
  background: #3ba55d;
  text-align: center;
  padding: 10px 20px;
  border-radius: 10px;
  margin: 0.25rem;
  margin-left: auto;
  transition: 0.17s;
  border: none;
  outline: none;
}

.button:hover {
  background: #2d7d46;
}

.button:active {
  background: #236136;
}

@media (max-width: 1100px) {
  .create-bot {
    padding: 0 10vw;
  }
}

@media (max-width: 700px) {
  .create-bot {
    padding: 0 30px;
  }

  .inputs {
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

  .preview {
    margin-top: 1rem;
  }

  .button-container {
    margin-top: 1rem;
  }
}
</style>
