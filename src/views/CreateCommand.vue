<template>
  <div class="create-command">
    <div class="header">
      <span class="title">커맨드 만들기</span>
      <div class="user">
        <span class="user-name">{{ user.name }}</span>
        <img class="user-avatar" alt="avatar" :src="user.avatar" />
      </div>
    </div>
    <form class="inputs" @submit.prevent="submit">
      <Input label="질문" v-model="question" />
      <Input label="대답" v-model="answer" :isTextArea="true" />

      <input ref="submit" type="submit" style="display: none" />

      <div class="preview-container">
        <span>미리보기</span>
        <div class="preview">
          <Message
            :isUser="true"
            :name="user.name"
            :avatar="user.avatar"
            :content="bot.prefix + (question ?? '안녕')"
          />
          <Message
            style="margin-top: -1rem"
            :name="bot.name"
            :avatar="bot.avatar"
            :content="answer"
          />
        </div>
      </div>
    </form>
    <div class="button-container">
      <span class="button" @click="submitButton">만들기</span>
    </div>
  </div>
</template>

<script>
import Input from "../components/Input.vue";
import Message from "../components/Message.vue";
import axios from "axios";

export default {
  components: { Input, Message },
  data() {
    return {
      question: null,
      answer: null,
      user: {
        name: "",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      bot: {
        name: "",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
        prefix: "!",
      },
    };
  },
  async mounted() {
    const token = this.$route.query.token;

    if (!token) {
      return this.$router.push("/");
    }

    const { status, data } = await axios.get(`/createCommand?token=${token}`);

    if (status !== 200) {
      return this.$router.push("/");
    }

    this.user.name = data.userName;
    this.user.avatar = data.userAvatar;
    this.bot.name = data.botName;
    this.bot.avatar = data.botAvatar;
    this.bot.prefix = data.botPrefix;
  },
  methods: {
    async submit() {
      const { status } = await axios
        .post(`/createCommand?token=${this.$route.query.token}`, {
          question: this.question,
          answer: this.answer,
        })
        .catch(() => {
          alert("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        });

      if (status === 200) {
        this.$router.push("/done");
      }
    },
    submitButton() {
      this.$refs.submit.click();
    },
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
