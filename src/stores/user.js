const state = {
  uid: "",
  loggedIn: false,
  error: ""
};

const getters = {};

const mutations = {
  editLoginInfo(state, loginInfo) {
    state.uid = loginInfo.uid;
    state.loggedIn = loginInfo.loggedIn;
  },
  editError(state, error) {
    state.error = error;
  }
};

const actions = {
  login({ commit }, loginInfo) {
    commit("editLoginInfo", loginInfo);
  },
  logout({ commit }) {
    commit("editLoginInfo", { uid: "", loggedIn: false });
  },
  error({ commit }, error) {
    commit("editError", error);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
