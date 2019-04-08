<template>
  <div id="app">
    <keep-alive :include="keepAlive" >
      <router-view/>
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

const namespace: string = 'global';

@Component
export default class App extends Vue {
  @Getter('getKeepAlive', { namespace }) private keepAlive: string;
}
</script>

