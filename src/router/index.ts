import { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router';
const fs = require('fs')
const path = require('path')

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/add',
    name: 'Root',
    component: () => import(/* webpackChunkName: "home" */ '@/views/index.vue'),
    children: [
      {
        path: 'add',
        name: 'Add',
        component: () => import(/* webpackChunkName: "add" */ '@/views/add/index.vue')
      },
      {
        path: 'list',
        name: 'List',
        component: () => import(/* webpackChunkName: "list" */ '@/views/list/index.vue')
      }
    ]
  }
];

const fileExists = (name: string | symbol | undefined): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    fs.access(path.resolve(__dirname, `../skeleton/${String(name)}.vue`), fs.constants.F_OK, function(err: Error) {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    });
  })
}

const insertSkeletonComponent = (list: RouteRecordRaw[]) => {
  list.forEach(async (route: any) => {
    const exist = await fileExists(route.name)
    if (exist) {
      console.log(exist, route, '-----------------------------')
      route.components.detault = route.component
      route.components.skeleton = import(/* webpackChunkName: "skeleton" */ `@/views/skeleton/${route.name}.vue`)
      // delete route.component
    }
    if (route.children) {
      insertSkeletonComponent(route.children)
    }
  })
}
insertSkeletonComponent(routes)

const router = createRouter({
  // createWebHashHistory 函数第一个参数为 base url
  history: createWebHashHistory(''),
  routes,
});

export default router;
