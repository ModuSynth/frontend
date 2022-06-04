<script lang="ts">
import INode from '@/interfaces/INode';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NodeWrapper extends Vue {
  @Prop() readonly node!: INode;
}
</script>

<template>
  <g height="100" width="100">
    <rect fill="black" height="100" width="100" :x="node.x" :y="node.y" />
    <text fill="white" :x="node.x + 5" :y="node.y + 22" width="100" font-size="16">{{ node.id }}</text>
  </g>
</template>