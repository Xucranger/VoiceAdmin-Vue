/*
 * @Description:登陆页面
 * @Author: Xucranger
 * @Date: 2023-01-30 10:30
 */

export const loginRouters = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('/@/views/system/login/login.vue'),
    meta: {
      title: '登录',
      hideInMenu: true,
    },
  },
];
