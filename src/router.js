import { createRouter, createWebHistory } from "vue-router";
import NotesItems from "./components/notes/NotesItems.vue";
import NotesCreated from "./components/notes/NotesCreated.vue";
import NotesDetail from "./components/notes/NotesDetails.vue";
import userAuth from "./auth/userAuth.vue";
import store from "./store/index";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/userAuth" },
    {
      path: "/userAuth",
      component: userAuth,
      meta: {
        requiresUnauth: true,
      },
    },
    {
      path: "/notes",
      component: NotesItems,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/addNote",
      component: NotesCreated,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/notes/:id",
      component: NotesDetail,
      props: true,
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next("/userAuth");
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next("/notes");
  } else {
    next();
  }
});

export default router;
