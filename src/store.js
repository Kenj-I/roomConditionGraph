import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import user from "./stores/user.js";
import condition from "./stores/condition.js";
import light from "./stores/light.js";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ["user.uid", "user.loggedIn"]
    })
  ],
  modules: {
    user,
    condition,
    light
  }
});
