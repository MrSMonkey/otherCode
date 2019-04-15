/*
 * @Description: 菜单列表数据
 * @Author: LiuZhen
 * @Date: 2019-01-18 11:20:52
 * @Last Modified by: chenmo
 * @Last Modified time: 2019-04-15 15:07:27
 */
import { BaseInterface } from './base.interface';

/**
 * buildAcreage  // 面积
 * building  // 楼栋
 * consociationType  // 运营类型index[1加盟托管 2非加盟托管 3自主管理]
 * floorNum  // 楼层
 * floorTotality  // 总楼层
 * hallNum  // 厅数量
 * kitchenNum  // 厨房数
 * number  // 几号
 * roomNum  // 卧室数
 * toiletNum  // 卫生间数
 * toward  //朝向index
 * unit  // 几单元
 * twordList //朝向枚举数组
 * consociationTypeName  // 运营类型[1加盟托管 2非加盟托管 3自主管理]
 * towardName  //朝向名字
 * cityName  // 城市
 * communityName  // 小区名称
 */

// 声明FormList接口类型
export interface PerfectForm extends BaseInterface {
  buildAcreage?: string;
  building?: string;
  consociationType?: string;
  floorNum?: string;
  floorTotality?: string;
  hallNum?: string;
  kitchenNum?: string;
  number?: string;
  roomNum?: string;
  toiletNum?: string;
  toward?: string;
  unit?: string;
  twordList?: string;
  consociationTypeName?: string;
  towardName?: string;
}
export interface HouseAppraiseForm extends BaseInterface {
  cityName?: string;
  communityName?: string;
  buildAcreage?: string;
  roomNum?: string;
  hallNum?: string;
  floorNum?: string;
  floorTotality?: string;
  cityId?: string;
  toiletNum?: string;
}
