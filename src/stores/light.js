import firebase from "../utils/firebase";
import dateFunc from "../utils/date";

const state = {
  lights: [],
  createdAts: [],
  loaded: false
};

const getters = {
  lightsData(state) {
    return {
      labels: state.createdAts,
      datasets: [
        {
          label: "Light",
          backgroundColor: "rgb(165, 162, 82, 0.5)",
          borderColor: "rgb(165, 162, 82)",
          data: state.lights,
          borderWidth: 2,
          pointRadius: 2
        }
      ]
    };
  }
};

const mutations = {
  editData(state, data) {
    state.lights = data.lights;
    state.createdAts = data.createdAts;
    state.loaded = data.loaded;
  }
};

const actions = {
  async fetch({ commit }) {
    try {
      const db = firebase.dbInit();
      let lightDb = db.collection("light");
      lightDb
        .orderBy("createdAt", "desc")
        .limit(100)
        .get()
        .then(querySnapshot => {
          const lights = [];
          const createdAts = [];
          querySnapshot.forEach(document => {
            const data = document.data();
            lights.unshift(data.value);
            createdAts.unshift(dateFunc.timestamp2md(data.createdAt.seconds));
          });

          commit("editData", {
            lights,
            createdAts,
            loaded: true
          });
        });
    } catch (e) {
      return;
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
