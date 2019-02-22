/*
 * @Description: 公共Mixins
 * @Author: LiuZhen
 * @Date: 2018-09-18 16:32:24
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-22 18:06:07
 */
import { Component, Vue } from 'vue-property-decorator';
import { Row, Col, Collapse, CollapseItem } from 'vant';
import Header from '@/components/Header.vue';

@Component({
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Header.name]: Header
  }
})
export default class CommonMixins extends Vue {
  /**
   * @description 切换组件时默认滚动到顶部
   * @author qingtong
   */
  public scrollToTop(): void {
    document.documentElement!.scrollTop = 0;
  }
}

// export const commonMixins = {
//   beforeCreate(): void {
//     this.$Progress.start()

//     this.$router.beforeEach((to, from, next) => {
//       if (to.meta.progress !== undefined) {
//         const meta = to.meta.progress
//         this.$Progress.parseMeta(meta)
//       }
//       this.$Progress.start()
//       next()
//     })

//     this.$router.afterEach((to, from) => {
//       this.$Progress.finish()
//     })
//   },

//   mounted(): void {
//     this.$Progress.finish()
//   },

//   components: {
//     Header
//   }
// };
