<script lang="ts">
import INode from '@/interfaces/INode';
import { NodeMutationTypes } from '@/store/nodes/enums';
import ns from '@/utils/ns';
import { Component, Prop, Vue } from 'vue-property-decorator';
import GainNode from '../nodes/GainNode.vue'
import OscillatorNode from '../nodes/OscillatorNode.vue'

@Component({
  components: { GainNode, OscillatorNode }
})
export default class NodeWrapper extends Vue {
  @Prop() readonly node!: INode;

  @ns.nodes.Mutation(NodeMutationTypes.START_DRAG) startDrag: any;

  @ns.nodes.Mutation(NodeMutationTypes.END_DRAG) endDrag: any;

  @ns.nodes.Mutation(NodeMutationTypes.MOVE_DRAG) moveDrag: any;
}
</script>

<template>
  <g
    :transform="`translate(${node.x} ${node.y})`"
    @mousedown.left.stop="startDrag({node, $event})"
    @mouseleave.stop="endDrag"
    @mousemove.stop="moveDrag"
    @mouseup="endDrag"
  >
    <component :is="node.type" :node="node"></component>
  </g>
</template>