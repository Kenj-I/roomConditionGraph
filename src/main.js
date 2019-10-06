import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import vuetify from "./plugins/vuetify";
import firebase from "./utils/firebase.js";
import beforeRouter from "./routers/beforeRouter.js";

firebase.init();

router.beforeEach((to, from, next) => {
  beforeRouter(to, from, next);
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
