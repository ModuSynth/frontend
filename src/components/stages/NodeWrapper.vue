<script lang="ts">
import INode from '@/interfaces/INode';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class NodeWrapper extends Vue {
  @Prop() readonly node!: INode;
}
</script>

<template>
  <rect :x="node.x" :y="node.y" height="100" width="100" fill="black" />
</template>