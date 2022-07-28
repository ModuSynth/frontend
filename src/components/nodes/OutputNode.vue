<script lang="ts">
import NodeWrapper from '@/interfaces/wrappers/NodeWrapper';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class OutputNode extends Vue {
  @Prop() node!: NodeWrapper;

  public mounted() {
    this.node.height = 50;
    this.node.width = 100;
  }
}
</script>

<template>
  <div>
  </div>
</template>