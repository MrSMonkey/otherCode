/*
 * @Description: 自定义函数里的interface
 * @Author: chenmo
 * @Date: 2019-01-18 11:20:52
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-15 15:08:23
 */
import { BaseInterface } from './base.interface';

/**
 * lat  // 纬度
 * lag  // 经度
 */
export interface Point extends BaseInterface {
  lat?: number;
  lag?: number;
}
