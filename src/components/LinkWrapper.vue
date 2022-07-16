<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ILink from '@/interfaces/ILink'
import {yInput, yOutput } from '@/utils/geometry/ports';
import { LinkActionTypes } from '@/store/links/enums';
import ns from '@/utils/ns';

@Component
export default class LinkWrapper extends Vue {
  @Prop() link!: ILink;

  @ns.links.Action(LinkActionTypes.DELETE_LINK) deleteLink: any;

  public hovering = false;

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
  <line :x1="fromX" :y1="fromY" :x2="toX" :y2="toY" :stroke="hovering ? '#FF0000' : '#00FF00'" stroke-width="4" @mouseenter="hovering = true" @mouseleave="hovering = false" @click="deleteLink(link)" />
</template>