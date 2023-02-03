/*
 * @Description:帮助文档
 * @Author: Xucranger
 * @Date: 2023-01-30 09:55
 */
import SmartHelpDocLayout from '/@/layout/help-doc-layout.vue';

export const helpDocRouters = [
  {
    path: '/help-doc',
    name: 'HelpDoc',
    component: SmartHelpDocLayout,
    meta: {
      title: '帮助文档',
      hideInMenu: true,
    },
    children: [
      {
        path: '/help-doc/detail',
        component: () => import('/@/views/support/help-doc/user-view/help-doc-user-view.vue'),
      },
    ],
  },
];
