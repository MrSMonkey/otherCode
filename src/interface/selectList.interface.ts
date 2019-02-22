/*
 * @Description: 菜单列表数据
 * @Author: LiuZhen
 * @Date: 2019-01-18 11:20:52
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-18 11:33:15
 */
import { BaseInterface } from './base.interface';

// 声明RouterList接口类型
export interface SelectList extends BaseInterface {
  label?: string;
  value?: string;
}
