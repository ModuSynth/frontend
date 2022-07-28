<script lang="ts">
import NodeWrapper from '@/interfaces/wrappers/NodeWrapper';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ChannelMergerNode extends Vue {
  @Prop() node!: NodeWrapper;

  public mounted() {
    this.node.height = 180;
    this.node.width = 130;
  }
}
</script>

<template>
  <div>
  </div>
</template>