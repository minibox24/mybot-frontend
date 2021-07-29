<template>
  <div class="create-command">
    <div class="header">
      <span class="title">커맨드 만들기</span>
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
      <Input label="질문" v-model="question" />
      <Input label="대답" v-model="answer" :isTextArea="true" />

      <div class="preview-container">
        <span>미리보기</span>
        <div class="preview">
          <Message
            name="User"
            :isUser="true"
            :content="question ? bot.prefix + question : '!안녕'"
          />
          <Message
            style="margin-top: -1rem"
            :name="bot.name"
            :avatar="bot.avatar"
            :content="answer"
          />
        </div>
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
      question: null,
      answer: null,
      bot: {
        name: "미니봇",
        avatar: "https://fs.minibox.xyz/minibot.png",
        prefix: "!",
      },
    };
  },
};
</script>

<style scoped>
.create-command {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 20vw;
  min-height: 100vh;
}

.header {
  display: flex;
  margin-top: 1rem;
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

.preview-container {
  margin-top: 3rem;
}

.preview {
  background: #36393f;
  margin-top: 0.5rem;
  max-height: 160px;
  overflow: auto;
}

.preview::-webkit-scrollbar {
  width: 12px;
}

.preview::-webkit-scrollbar-thumb {
  box-shadow: inset 0 0 12px 12px #202225;
  border-radius: 12px;
  border: solid 3px transparent;
}

.preview::-webkit-scrollbar-corner {
  background: #36393f;
}

.button-container {
  display: flex;
  margin-top: 2rem;
  margin-bottom: 1rem;
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
  cursor: pointer;
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

  .title {
    font-size: 2rem;
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
