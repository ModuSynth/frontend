<script lang="ts">
import INode from '@/interfaces/INode';
import { Component, Prop, Vue } from 'vue-property-decorator';
import GainNode from '../nodes/GainNode.vue'
import OscillatorNode from '../nodes/OscillatorNode.vue'

@Component({
  components: { GainNode, OscillatorNode }
})
export default class NodeWrapper extends Vue {
  @Prop() readonly node!: INode;
}
</script>

<template>
  <g
    :transform="`translate(${node.x} ${node.y})`"
  >
    <component :is="node.type" :node="node"></component>
  </g>
</template>