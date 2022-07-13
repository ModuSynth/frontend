<script lang="ts">
import INode from '@/interfaces/INode';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ChannelMergerNode extends Vue {
  @Prop() node!: INode;

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