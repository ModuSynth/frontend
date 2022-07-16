<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ILink from '@/interfaces/ILink'
import { portsY, portY, yInput, yOutput } from '@/utils/geometry/ports';
import INode from '@/interfaces/INode';

@Component
export default class LinkWrapper extends Vue {
  @Prop() link!: ILink;

  public get fromX(): number {
    return this.link.from.node.x + this.link.from.node.width;
  }

  public get toX(): number {
    return this.link.to.node.x
  }

  public get fromY() {
    return yOutput(this.link.from);
  }

  public get toY() {
    return yInput(this.link.to);
  }
}
</script>

<template>
  <line :x1="fromX" :y1="fromY" :x2="toX" :y2="toY" stroke="#00FF00" stroke-width="2" />
</template>