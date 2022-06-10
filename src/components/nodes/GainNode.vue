<script lang="ts">
import INode from '@/interfaces/INode';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GainNode extends Vue {
  @Prop() node!: INode;
}
</script>

<template>
  <g></g>
</template>