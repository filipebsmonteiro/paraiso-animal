export default [
  // {
  //   path: "/",
  //   component: () => import("@/layouts/MainLayout.vue"),
  //   redirect: { name: 'home' },
  //   children: [
      {
        path: "pessoa",
        name: "pessoa.list",
        component: () => import("@/pages/Pessoa/ListPage.vue"),
        meta: {
          title: 'Pessoas',
          middleware: [`auth`]
        }
      },
      {
        path: "pessoa/create",
        name: "pessoa.create",
        component: () => import("@/pages/Pessoa/CreateEditPage.vue"),
        meta: {
          title: 'Pessoas',
          middleware: [`auth`]
        }
      },
      {
        path: "pessoa/edit/:id",
        name: "pessoa.edit",
        component: () => import("@/pages/Pessoa/CreateEditPage.vue"),
        meta: {
          title: 'Editar Pessoa',
          middleware: [`auth`]
        }
      },
  //   ],
  // }
]