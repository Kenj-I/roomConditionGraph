<template>
  <div id="graph-page">
    <v-layout class="discription  mt-10 mb-6 mx-5 justify-center">
      <div>
        <p>使用言語・ツール等</p>
        <ul>
          <li><a href="https://amzn.to/33b8ycx">Raspberry pi zero WH</a></li>
          <li>
            <a href="https://shop.pimoroni.com/products/enviro-plus"
              >Pimorone Enviro plus</a
            >
            （温度と湿度の測定値が正確じゃないので手動補正してます）
          </li>
          <li>Golang</li>
          <li>Cloud FireStore</li>
          <li>Vue.js</li>
          <li>Firebase Auth</li>
          <li>Vuetify</li>
          <li>vue-chartjs</li>
        </ul>
      </div>
    </v-layout>
    <div class="graphs">
      <graph
        v-if="this.$store.state.condition.loaded"
        :data="this.$store.getters['condition/temperaturesData']"
        :options="this.options"
        class="graph"
      />
      <graph
        v-if="this.$store.state.condition.loaded"
        :data="this.$store.getters['condition/humiditysData']"
        :options="this.options"
        class="graph"
      />
      <graph
        v-if="this.$store.state.condition.loaded"
        :data="this.$store.getters['condition/pressuresData']"
        :options="this.options"
        class="graph"
      />
      <graph
        v-if="this.$store.state.light.loaded"
        :data="this.$store.getters['light/lightsData']"
        :options="this.options"
        class="graph"
      />
    </div>
  </div>
</template>

<script>
import graph from "@/components/LineGraph.vue";

export default {
  components: {
    graph
  },
  data: () => ({
    options: { responsive: true, maintainAspectRatio: false }
  }),
  mounted() {
    this.$store.dispatch("condition/fetch");
    this.$store.dispatch("light/fetch");
  }
};
</script>

<style lang="scss" scoped>
.graphs {
  margin: 56px 20px;

  .graph {
    margin: 20px 0;
  }
}
</style>
