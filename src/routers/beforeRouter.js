import firebase from "../utils/firebase.js";

const beforeRouter = async (to, from, next) => {
  const loggedIn = await firebase.checkLoggedIn();
  if (to.name === "Index" && loggedIn) {
    next("/graph");
  }
  if (to.name === "Graph" && !loggedIn) {
    next("/");
  }

  next();
};

export default beforeRouter;
