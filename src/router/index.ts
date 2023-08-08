import { createRouter, createMemoryHistory, createWebHistory, createWebHashHistory } from 'vue-router'
import routes from './routes'
import { SessionStorage } from "@/helpers/browser-storage.ts";
import constants from '@/providers/constants'
import firebase from "@/providers/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useAuthStore } from '@/stores/auth/index'
import store from '@/stores'

const createHistory = process.env.SERVER
  ? createMemoryHistory
  : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

const Router = createRouter({
  scrollBehavior: () => ({ left: 0, top: 0 }),
  routes,

  history: createHistory(process.env.VUE_ROUTER_BASE)
});

Router.beforeEach(async ($to, $from, $next) => {
  const { isLogged } = useAuthStore(store);
  if (
    $to.meta &&
    $to.meta.middleware &&
    $to.meta.middleware.includes('auth') &&
    !isLogged
  ) {
    // $next({
    //   name: constants.routes.login.name,
    //   query: { ...$to.query, redirectPath: $to.path }
    // });
    $next({ name: constants.routes.login.name });
    return;
  }

  $next()
})

export default Router;

// Detect if user info loads after page loads 
onAuthStateChanged(firebase.auth, (user) => {
  if (user) {
    SessionStorage.set(constants.storage.session.USER, user);
    const authStore = useAuthStore(store);

    if (!authStore.user) {
      Router.push({ name: `home` })
      authStore.user = user;
    }

    // Redirect after login
    // console.log('router :>> ', router);
    // if (window.location.search.split('?').length > 1) {
    //   var params = window.location.search.split('?')[1].split('&');
    //   for (var i = 0; i < params.length; i++) {
    //     var key = params[i].split('=')[0];
    //     var value = decodeURIComponent(params[i].split('=')[1]);
    //     queryString[key] = value;
    //   }
    // }
    // const uri = window.location.search.substring(1);
    // const params = new URLSearchParams(uri);
    // if (params.get("redirectPath")) {
    //   window.location.href = params.get("redirectPath")
    // }
  }
})