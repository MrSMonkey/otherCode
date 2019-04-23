/*
 * @Description: linyu
 * @Author: linyu
 * @Date: 2019-04-02 15:23:08
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-23 11:00:14
 */
import { BaseInterface } from './base.interface';

/* 定义首页星空图片规范 */
interface StartHomeImgInterface {
  alt?: string;
  src?: string;
}
/* 定义购买链接规范 */
interface EnumInterface {
  [index: number]: string;
}
/* 步骤规范 */
interface StepInterface {
  [index: number]: {src: string; text: string};
}
/* 表格规范 */
interface TablesDataInterface {
  [index: number]: {name: string; owner: boolean; uoko: boolean};
}
interface TablesInterface {
  [index: number]: {title: string; data: TablesDataInterface};
}
/* COLUMNS规范 */
interface ColumnsInterface {
  [index: number]: {dataIndex: string; title: string};
}
/* BADGES规范 */
interface BadgesInterface {
  [index: number]: {img: object; text: string; dec: string};
}
/* 资产列表*/
interface ListInterface {
  [index: number]: {title: string; text: string};
}
/* 定义线上提交流程*/
interface HoustFlowInterface {
  [index: number]: {img: object; text: string; };
}
/* 定义线上运营类型*/
interface TypeListInterface {
  [index: number]: {value: number; text: string; };
}
/* 定义房间朝向枚举 */
interface TowardListInterface {
  [index: number]: {value: number|string; text: string; };
}
/* 城市选择列表item */
interface CityItem {
  cityId: string;
  cityName: string;
}
/* 管家选择列表item */
interface StewardItem {
  assetUserId: string;
  assetUserName: string;
  assetUserPhone?: string;
  houseNum?: number;
}
export {
  StartHomeImgInterface,
  EnumInterface,
  StepInterface,
  TablesInterface,
  ColumnsInterface,
  BadgesInterface,
  ListInterface,
  HoustFlowInterface,
  TypeListInterface,
  TowardListInterface,
  CityItem,
  StewardItem
};
