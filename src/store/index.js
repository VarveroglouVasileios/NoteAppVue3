import { createStore } from "vuex";
import notesModules from "./modules/notes/index";
import authModules from "./modules/auth";
const store = createStore({
  modules: {
    notes: notesModules,
    auth: authModules,
  },
});

export default store;
