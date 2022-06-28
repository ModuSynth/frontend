<script lang="ts">
import INode from '@/interfaces/INode';
import { NodeActionTypes, NodeMutationTypes } from '@/store/nodes/enums';
import ns from '@/utils/ns';
import { Component, Prop, Vue } from 'vue-property-decorator';
import GainNode from './nodes/GainNode.vue'
import OscillatorNode from './nodes/OscillatorNode.vue'
import dimensionsFactory from '@/factories/DimensionsFactory'


/**
 * A node wrapper is a component displaying every node in the same way. It helps at providing
 * a standard node display for each and every type of node. Parameters are dynamically displayed
 * depending on their type (number parameter or list value parameter).
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
@Component({
  components: { GainNode, OscillatorNode }
})
export default class NodeWrapper extends Vue {
  @Prop() readonly node!: INode;

  @ns.nodes.Mutation(NodeMutationTypes.START_DRAG) startDrag: any;

  @ns.nodes.Action(NodeActionTypes.SAVE_POSITION) endDrag: any;

  @ns.nodes.Mutation(NodeMutationTypes.MOVE_DRAG) moveDrag: any;

  @ns.nodes.Action(NodeActionTypes.DELETE) deleteNode: any;

  public get width(): number {
    return dimensionsFactory.width(this.node.type) || 160;
  }

  public get height(): number {
    return dimensionsFactory.height(this.node.type) || 160;
  }
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
    <rect fill="black" stroke="#00FF00" stroke-width="2 " :width="width" :height="height" />
    <text x="5" y="20" fill="#00FF00">{{ $t(`nodes.types.${node.type}`) }}</text>
    <text
      :x="width - 20"
      y="20"
      fill="#00FF00"
      font-size="24"
      class="close"
      @click.stop="deleteNode(node.id)"
      @mousedown.stop
    >
      &times;
    </text>
    <component :is="node.type" :node="node"></component>
  </g>
</template>

<style scoped>
.close:hover {
  cursor: pointer;
}
</style>