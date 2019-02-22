<!--
/*
 * @Description 基于迅雷组件懒加载修改
 * @Author: QingTong 
 * @Date: 2018-11-27 11:17:38 
 * @Last Modified by: LiuZhen
 * @Last Modified time: 2019-01-23 11:39:39
 */
-->
<template>
  <transition-group :tag="tagName" name="lazy-component" style="position: relative;"
    @before-enter="(el) => $emit('before-enter', el)"
    @before-leave="(el) => $emit('before-leave', el)"
    @after-enter="(el) => $emit('after-enter', el)"
    @after-leave="(el) => $emit('after-leave', el)">
    <div v-if="isInit" key="component">
      <slot :loading="loading"></slot>
    </div>
    <div v-else-if="$slots.skeleton" key="skeleton">
      <slot name="skeleton"></slot>
    </div>
    <div v-else key="loading"></div>
  </transition-group>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Emit, Watch } from 'vue-property-decorator';
  import request from '@/request';
  @Component
  export default class LazyComponent extends Vue {
    @Prop({ type: Number, default: 0 })
    private timeout: number;
    @Prop({ type: String, default: '0px' })
    private threshold: string;
    @Prop({ type: String, default: 'div' })
    private tagName: string;
    @Prop({ type: Number, default: 50 })
    private maxWaitingTime: number;
    @Prop({ type: Object, default: () => null })
    private viewport: object;
    // 新加prop
    @Prop({ type: Object, default: {} })
    private datas: object;
    private isInit: boolean = false;
    private timer: any = null;
    private io: any = null;
    private loading: boolean = false; // 是否正在加载component

    private created(): void {
        // 如果指定timeout则无论可见与否都是在timeout之后初始化
        if (this.timeout) {
            this.timer = setTimeout(() => {
                this.init();
            }, this.timeout);
        }
    }
    private mounted(): void {
        // 根据滚动方向来构造视口外边距，用于提前加载
        const rootMargin: string = `0px ${this.threshold}`;
        // 观察视口与组件容器的交叉情况
        this.io = new (window as any).IntersectionObserver(this.intersectionHandler, {
            rootMargin,
            root: this.viewport,
            // threshold: [ 0, Number.MIN_VALUE, 0.01]
            threshold: [ 0.2, 0.7 ]
        });
        this.io.observe(this.$el);
    }
    @Emit('change-title')
    private changeTitle(): void {
        return ;
    }
    @Emit('before-init')
    private requestData(): void {
        return ;
    }

    private async intersectionHandler(entries: any): Promise<void> {
        if (
          // 正在交叉
          entries[0].isIntersecting ||
          // 交叉率大于0
          entries[0].intersectionRatio
        ) {
            if (entries[0].intersectionRatio >= 0.5) {
                this.changeTitle(); // this.$emit('change-title');
            }
            if (JSON.stringify(this.datas) === '{}' || !this.datas) {
                this.requestData(); // this.$emit('before-init');
            } else {
                this.init();
                // this.io.unobserve(this.$el);
            }
            // this.init();
            // this.io.unobserve(this.$el);
        }
    }

    private init(): void {
        // 此时说明骨架组件即将被切换
        // this.$emit('beforeInit');
        // this.$emit('before-init');

        // 此时可以准备加载懒加载组件的资源
        this.loading = true;

        // 由于函数会在主线程中执行，加载懒加载组件非常耗时，容易卡顿
        // 所以在requestAnimationFrame回调中延后执行
        this.requestAnimationFrame(() => {
            this.isInit = true;
            // this.$emit('init');
        });
    }

    private requestAnimationFrame(callback: any): number {
        // 防止等待太久没有执行回调
        // 设置最大等待时间
        setTimeout(() => {
            if (this.isInit) {
                return false;
            }
            callback();
        }, this.maxWaitingTime);
        // 兼容不支持requestAnimationFrame 的浏览器
        return (window.requestAnimationFrame || ((cb) => setTimeout(cb, 1000 / 60)))(callback);
    }
    private beforeDestroy(): void {
        // 在组件销毁前取消观察
        if (this.io) {
            this.io.unobserve(this.$el);
        }
    }

    @Watch('datas')
    private dataChange(val: any, oldVal: any): void {
        this.init();
    }
  }
</script>

<style lang="css">
  .lazy-component-enter {
    opacity: 0;
  }
  .lazy-component-enter-to {
    opacity: 1;
  }
  .lazy-component-enter-active {
    transition: opacity 0.3s 0.2s;
    position: absolute;
    top: 0;
    width: 100%;
  }
  .lazy-component-leave {
    opacity: 1;
  }
  .lazy-component-leave-to {
    opacity: 0;
  }
  .lazy-component-leave-active {
    transition: opacity 0.5s;
  }
</style>