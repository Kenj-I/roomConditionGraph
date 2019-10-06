import firebase from "../utils/firebase";
import dateFunc from "../utils/date";

const state = {
  temperatures: [],
  humiditys: [],
  pressures: [],
  createdAts: [],
  loaded: false
};

const getters = {
  temperaturesData(state) {
    return {
      labels: state.createdAts,
      datasets: [
        {
          label: "Temperature",
          backgroundColor: "rgb(82,126,165,0.5)",
          borderColor: "rgb(82,126,165)",
          data: state.temperatures,
          borderWidth: 2,
          pointRadius: 2
        }
      ]
    };
  },
  humiditysData(state) {
    return {
      labels: state.createdAts,
      datasets: [
        {
          label: "Humidity",
          backgroundColor: "rgb(82, 165, 115,0.5)",
          borderColor: "rgb(82, 165, 115)",
          data: state.humiditys,
          borderWidth: 2,
          pointRadius: 2
        }
      ]
    };
  },
  pressuresData(state) {
    return {
      labels: state.createdAts,
      datasets: [
        {
          label: "Pressures",
          backgroundColor: "rgb(163, 163, 163,0.5)",
          borderColor: "rgb(163, 163, 163)",
          data: state.pressures,
          borderWidth: 2,
          pointRadius: 2
        }
      ]
    };
  }
};

const mutations = {
  editData(state, data) {
    state.temperatures = data.temperatures;
    state.humiditys = data.humiditys;
    state.pressures = data.pressures;
    state.createdAts = data.createdAts;
    state.loaded = data.loaded;
  }
};

const actions = {
  async fetch({ commit }) {
    try {
      const db = firebase.dbInit();
      let conditions = db.collection("conditions");
      conditions
        .orderBy("createdAt", "desc")
        .limit(100)
        .get()
        .then(querySnapshot => {
          const temperatures = [];
          const humiditys = [];
          const pressures = [];
          const createdAts = [];
          querySnapshot.forEach(document => {
            const data = document.data();
            temperatures.unshift(data.temperature);
            humiditys.unshift(data.humidity);
            pressures.unshift(data.pressure);
            createdAts.unshift(dateFunc.timestamp2ymd(data.createdAt.seconds));
            // createdAts.push(data.createdAt);
          });

          commit("editData", {
            temperatures,
            humiditys,
            pressures,
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
