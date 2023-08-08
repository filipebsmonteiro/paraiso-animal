import pessoa from "./pessoa";

const routes = [
  {
    path: "/auth",
    component: () => import("@/layouts/LoginLayout.vue"),
    redirect: { name: 'login' },
    children: [
      {
        path: "login",
        name: "auth.login",
        component: () => import("@/pages/Auth/LoginPage.vue"),
        meta: { title: 'Login' }
      },
    ]
  },

  {
    path: "/",
    component: () => import("@/layouts/MainLayout.vue"),
    redirect: { name: 'home' },
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/pages/Index.vue"),
        meta: {
          title: 'Home',
          middleware: [`auth`]
        }
      },

      ...pessoa,
    ],

  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("@/pages/Error/NotFound.vue"),
  },
];

export default routes;
