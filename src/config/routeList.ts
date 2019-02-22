/*
 * @Description: 菜单列表数据
 * @Author: LiuZhen
 * @Date: 2019-01-18 11:20:52
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-18 11:33:15
 */
import { RouteList } from '../interface/routeList.interface';

export const routeList: RouteList[] = [
  {
    label: '业务经营',
    value: 'businessOpa',
    route: '/businessOpa',
    icon: 'yewu',
  },
  // {
  //   label: '主站流量',
  //   value: 'mainFlow',
  //   route: '/mainFlow',
  //   icon: 'liuliang',
  // },
  {
    label: '数据质量',
    value: 'reportTopic',
    route: '/home',
    icon: 'zhuti',
  }
];
