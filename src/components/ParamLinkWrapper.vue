<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IParamLink } from '@/interfaces/ILink'
import IParam from '@/interfaces/IParam';

@Component
export default class ParamLinkWrapper extends Vue {
  @Prop() link!: IParamLink;

  public get fromX(): number {
    return this.link.from.node.x + this.link.from.node.width;
  }

  public get param(): IParam | undefined {
    return this.link.to.node.params.find(p => p.name == this.link.paramName);
  }

  public get toX(): number {
    return this.link.to.node.x + 22
  }

  public get fromY() {
    return this.link.from.node.y + (this.link.from.node.height / 2)
  }

  public get toY() {
    return this.link.to.node.y + (this.param?.dy || 0)
  }

  public mounted() {
    console.log(this.param);
  }
}
</script>

<template>
  <line :x1="fromX" :y1="fromY" :x2="toX" :y2="toY" stroke="#00FF00" stroke-width="2" />
</template>