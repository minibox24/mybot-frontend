<template>
  <div class="create-bot">
    <div class="header">
      <span class="title">봇 만들기</span>
      <div class="user">
        <span class="user-name">{{ user.name }}</span>
        <img class="user-avatar" alt="avatar" :src="user.avatar" />
      </div>
    </div>
    <form class="inputs" @submit.prevent="submit">
      <Input
        :width="20"
        label="이름"
        v-model="name"
        pattern="^.{1,65}$"
        title="봇의 이름은 최소 1자, 최대 65자입니다."
        :required="true"
      />
      <Input
        :width="20"
        label="프리픽스"
        v-model="prefix"
        pattern="^.{1,20}$"
        title="봇의 프리픽스는 최소 1자, 최대 20자입니다."
        :required="true"
      />
      <Input
        :width="20"
        label="프로필 사진 URL"
        v-model="avatar"
        pattern="^https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png)$"
        title="이미지 URL 형식만 가능합니다."
        :required="false"
      />

      <input ref="submit" type="submit" style="display: none" />

      <div class="preview">
        <span>미리보기</span>
        <Message style="margin-top: 0.5rem" :name="name" :avatar="avatar" />
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
      name: null,
      prefix: null,
      avatar: null,
      user: {
        name: "",
        avatar: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
    };
  },
  async mounted() {
    const token = this.$route.query.token;

    if (!token) {
      return this.$router.push("/");
    }

    const { status, data } = await axios.get(`/createBot?token=${token}`);

    if (status !== 200) {
      return this.$router.push("/");
    }

    this.user.name = data.userName;
    this.user.avatar = data.userAvatar;
  },
  methods: {
    async submit() {
      const { status } = await axios
        .post(`/createBot?token=${this.$route.query.token}`, {
          name: this.name,
          prefix: this.prefix,
          avatar: this.avatar,
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
.create-bot {
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
