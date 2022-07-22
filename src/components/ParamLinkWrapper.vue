<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IParamLink } from '@/interfaces/ILink'
import IParam from '@/interfaces/IParam';
import ns from '@/utils/ns';
import { LinkActionTypes } from '@/store/links/enums';

@Component
export default class ParamLinkWrapper extends Vue {
  @Prop() link!: IParamLink;

  @ns.links.Action(LinkActionTypes.DELETE_PARAM_LINK) deleteLink: any;

  public hovering: boolean = false;

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
}
</script>

<template>
  <line
    :x1="fromX"
    :y1="fromY"
    :x2="toX"
    :y2="toY"
    stroke="#00FF00"
    :stroke="hovering ? '#FF0000' : '#00FF00'"
    stroke-width="4"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
    @click="deleteLink(link)"
  />
</template>