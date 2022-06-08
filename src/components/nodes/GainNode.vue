<script lang="ts">
import INode from '@/interfaces/INode';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class GainNode extends Vue {
  @Prop() node!: INode;
}
</script>

<template>
  <g>
    <rect fill="black" stroke="#00FF00" stroke-width="2 " width="160" height="160" x="0" y="O" />
    <text x="5" y="20" fill="#00FF00">{{ $t('nodes.types.GainNode') }}</text>
  </g>
</template>