<template>
  <div class="graph">
    <div class="canvas-container">
      <canvas ref="canvas" width="400" height="200" />
    </div>
    <div class="texts">
      <span class="now">{{ now }}원</span>
      <span class="next">{{ next }}초 후 가격 변동</span>
    </div>
    <div class="select-container">
      <select v-model="selected">
        <option value="1h">1시간</option>
        <option value="3h">3시간</option>
        <option value="6h">6시간</option>
        <option value="12h">12시간</option>
        <option value="1d">1일</option>
      </select>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js";
import axios from "axios";

export default {
  data() {
    return {
      chart: null,
      next: 0,
      history: [],
      loop: null,
      selected: "1h",
    };
  },
  async mounted() {
    await this.reload();

    this.chart = new Chart(this.$refs.canvas.getContext("2d"), {
      type: "line",
      data: {
        labels: this.history.map((x) => x[0]),
        datasets: [
          {
            data: this.history.map((x) => x[1]),
            backgroundColor: "rgba(255, 200, 0, 0.2)",
            borderColor: "rgba(255, 200, 0, 1)",
            borderWidth: 1,
            pointRadius: 0,
            pointHitRadius: 10,
          },
        ],
      },
      options: {
        title: {
          display: true,
          text: "파이 가격",
          fontColor: "white",
          fontSize: 20,
        },
        legend: {
          display: false,
        },
      },
    });

    this.loop = setInterval(async () => {
      if (this.next <= 0) {
        await this.reload();

        this.chart.data.labels = this.history.map((x) => x[0]);
        this.chart.data.datasets[0].data = this.history.map((x) => x[1]);
        this.chart.update();
      } else {
        this.next -= 1;
      }
    }, 1000);
  },
  methods: {
    async reload() {
      let limit = 60;

      switch (this.selected) {
        case "1h":
          limit = 60;
          break;
        case "3h":
          limit = 180;
          break;
        case "6h":
          limit = 360;
          break;
        case "12h":
          limit = 720;
          break;
        case "1d":
          limit = 1440;
          break;
      }

      const { data } = await axios.get(`/piePrice?limit=${limit}`);

      this.next = data.next;
      this.history = data.history;
      this.now = data.history[data.history.length - 1][1];
    },
  },
  watch: {
    async selected() {
      await this.reload();

      this.chart.data.labels = this.history.map((x) => x[0]);
      this.chart.data.datasets[0].data = this.history.map((x) => x[1]);
      this.chart.update();
    },
  },
};
</script>

<style>
.graph {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.canvas-container {
  width: 80%;
}

.texts {
  display: flex;
  width: 75%;

  font-size: 1.5rem;
  margin-top: 1rem;
}

.next {
  margin-left: auto;
}

.select-container {
  margin-top: 0.5rem;
  display: flex;
  width: 75%;
}

select {
  margin-left: auto;
}

@media (max-width: 700px) {
  .canvas-container {
    width: 95%;
  }

  .texts {
    flex-direction: column;
    align-items: center;
  }

  .next {
    margin-left: 0;
  }
}
</style>