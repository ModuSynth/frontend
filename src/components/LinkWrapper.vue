<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ILink from '@/interfaces/ILink'
import { portsY, portY } from '@/utils/geometry/ports';
import INode from '@/interfaces/INode';

@Component
export default class LinkWrapper extends Vue {
  @Prop() link!: ILink;

  public get fromX(): number {
    return this._from.x + this._from.width;
  }

  public get toX(): number {
    return this._to.x
  }

  public get fromY() {
    return this._from.y + portsY(this._from, this._outputs) + portY(this.link.from.index)
  }

  public get toY() {
    return this._to.y + portsY(this._to, this._inputs) + portY(this.link.to.index)
  }

  /** Private methods */

  private get _from(): INode {
    return this.link.from.node;
  }

  private get _outputs(): number {
    return this._from.waaNode.numberOfOutputs
  }
  
  private get _inputs(): number {
    return this._to.waaNode.numberOfInputs
  }

  private get _to(): INode {
    return this.link.to.node;
  }
}
</script>

<template>
  <line :x1="fromX" :y1="fromY" :x2="toX" :y2="toY" stroke="#00FF00" stroke-width="2" />
</template>