<script lang="ts">
import INode from '@/interfaces/INode';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class OutputNode extends Vue {
  @Prop() node!: INode;

  public mounted() {
    this.node.height = 50;
    this.node.width = 50;
  }
}
</script>

<template>
  <div>
  </div>
</template>