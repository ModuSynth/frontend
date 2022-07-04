<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ILink from '@/interfaces/ILink'

@Component
export default class LinkWrapper extends Vue {
  @Prop() link!: ILink;

  public mounted() {
    console.log(this.link);
  }

  public get fromX(): number {
    return this.link.from.node.x + this.link.from.node.width;
  }

  public get toX(): number {
    return this.link.to.node.x
  }

  public get fromY() {
    return this.link.from.node.y + (this.link.from.node.height / 2)
  }

  public get toY() {
    return this.link.to.node.y + (this.link.to.node.height / 2)
  }
}
</script>

<template>
  <line :x1="fromX" :y1="fromY" :x2="toX" :y2="toY" stroke="#00FF00" stroke-width="2" />
</template>