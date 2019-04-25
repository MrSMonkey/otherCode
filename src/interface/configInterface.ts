/*
 * @Description: linyu
 * @Author: linyu
 * @Date: 2019-04-02 15:23:08
 * @Last Modified by: linyu
 * @Last Modified time: 2019-04-24 15:55:21
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
/* 定义城市picker的item接口 */
interface CityItem {
  cityId: string;
  cityName: string;
}
/* 定义户型组件属性接口 */
interface HouseTypeInputProp {
  max: number;
  show: boolean;
}
/* 定义户型组件内部户型参数接口 */
interface HouseTypeInputOpts {
  max: number;
  show: boolean;
  unit: string;
  className: string;
}
/* 定义房屋估价户型选择结果 */
interface HouseTypeResult {
  roomNum: string | number;
  toiletNum: string | number;
  hallNum: string | number;
}

/* 定义运行环境 */
interface AppType {
  wechat?: string;
  weibo?: string;
  qq?: string;
  unknown?: string;
}

/* 定义设备系统*/
interface AppDevice {
  android?: string;
  ios?: string;
  unknown?: string;
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
  HouseTypeInputProp,
  HouseTypeInputOpts,
  HouseTypeResult,
  AppType,
  AppDevice
};
