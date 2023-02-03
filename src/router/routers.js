/*
 * @Description:所有路由入口
 * @Author: Xucranger
 * @Date: 2023-01-30 10:30
 */
import { homeRouters } from './system/home';
import { loginRouters } from './system/login';
import { helpDocRouters } from './support/help-doc';

export const routerArray = [...loginRouters, ...homeRouters, ...helpDocRouters];
