/*
 * @Description:项目入口
 * @Author: Xucranger
 * @Date: 2023-01-28 11:14
 */
import '/@/theme/index.less';
import * as antIcons from '@ant-design/icons-vue';
import Antd, { message } from 'ant-design-vue';
import JsonViewer from 'vue3-json-viewer';
import constantsInfo from '/@/constants/index';
import { createApp } from 'vue'
import App from './App.vue'
import lodash from "lodash";
import smartEnumPlugin from '/@/plugins/smart-enums-plugin';
import { getTokenFromCookie } from "/@/utils/cookie-util";
import privilegePlugin from '/@/plugins/privilege-plugin';
import { privilegeDirective } from '/@/directives/privilege';
import { router } from "/@/router/index";
import { store }   from "/@/store/index";
import { i18n } from "/@/i18n/index"

//不需要获取用户信息、用户菜单、用户菜单动态路由，直接初始化vue即可
let token = getTokenFromCookie();
if (!token) {
    initVue();
} else {
    //如果有用户信息，则需要获得用户权限再登陆
    getLoginInfo();
}


async function getLoginInfo(){
    try {
        //获取登录用户信息
        const res = await loginApi.getLoginInfo();
        //构建系统的路由
        let menuRouterList = res.data.menuList.filter((e) => e.path || e.frameUrl);
        buildRoutes(menuRouterList);
        initVue();
        //更新用户信息到pinia
        useUserStore().setUserLoginInfo(res.data);
    }
    catch (e) {
        message.error(e);
        smartSentry.captureError(e);
        initVue();
    }
}

function initVue(){
    let vueApp = createApp(App);
    let app = vueApp.use(router).use(store).use(i18n).use(Antd).use(smartEnumPlugin, constantsInfo).use(privilegePlugin).use(JsonViewer);
    //注入权限
    app.directive('privilege', {
        mounted(el, binding) {
            privilegeDirective(el, binding);
        },
    });
    // 注册图标组件
    Object.keys(antIcons).forEach((key) => {
        app.component(key, antIcons[key]);
    });
    //全局
    app.config.globalProperties.$antIcons = antIcons;
    app.config.globalProperties.$lodash = lodash;
    //挂载
    app.mount('#app');
}



