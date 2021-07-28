<template>
  <div class="message">
    <img
      class="avatar"
      alt="avatar"
      :src="avatar ?? 'https://cdn.discordapp.com/embed/avatars/0.png'"
      @error="defaultImage"
    />
    <div class="contents">
      <div class="header">
        <span class="name">{{ name ?? "마이봇" }}</span>
        <span class="bot">봇</span>
        <span class="time">오늘 오전 12:00</span>
      </div>
      <span class="content">{{ content ?? "안녕하세요!" }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: String,
    avatar: String,
    content: String,
  },
  methods: {
    defaultImage(e) {
      e.target.src = "https://cdn.discordapp.com/embed/avatars/0.png";
    },
  },
};
</script>

<style scoped>
.message {
  background: #36393f;
  display: flex;
  padding: 1rem;
}

.contents {
  margin-left: 0.7rem;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-top: 5px;
}

.header {
  display: flex;
  align-items: center;
}

.name {
  max-width: 300px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.bot {
  font-size: 0.625rem;
  background: #5865f2;
  margin-left: 0.25rem;
  height: 0.9375rem;
  padding: 0 0.275rem;
  margin-top: 0.075em;
  border-radius: 0.1875rem;
}

.time {
  color: #72767d;
  font-size: 0.75rem;
  margin-left: 0.3rem;
}

.content {
  margin-top: -10px;
  font-weight: lighter;
  white-space: pre-line;
}
</style>
