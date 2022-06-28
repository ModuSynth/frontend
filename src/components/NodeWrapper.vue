<script lang="ts">
import INode from '@/interfaces/INode';
import { NodeActionTypes, NodeMutationTypes } from '@/store/nodes/enums';
import ns from '@/utils/ns';
import { Component, Prop, Vue } from 'vue-property-decorator';
import GainNode from './nodes/GainNode.vue'
import OscillatorNode from './nodes/OscillatorNode.vue'
import dimensionsFactory from '@/factories/DimensionsFactory'
import { NODE_PADDING, PARAM_WIDTH, NODE_CLOSE_SIZE, NODE_TITLE_HEIGHT } from '@/utils/constants';


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

  public get titleStyle() {
    return {"--size": `${NODE_TITLE_HEIGHT}px`, "--font-size": `${NODE_TITLE_HEIGHT}px`}
  }

  public get closeButtonStyle() {
    return {"--size": `${NODE_CLOSE_SIZE}px`, "--font-size": `${NODE_CLOSE_SIZE + 4}px`}
  }

  public get width(): number {
    return PARAM_WIDTH + 2 * NODE_PADDING;
  }

  public get height(): number {
    return dimensionsFactory.height(this.node.type) || 160;
  }
}
</script>

<template>
  <g
    :transform="`translate(${node.x} ${node.y})`"
  >
    <foreignObject
      :width="width"
      :height="height"
    >
      <div class="node-container" @mousedown.left.stop="startDrag({node, $event})">
        <div :style="titleStyle" class="node-title">{{ $t(`nodes.types.${node.type}`) }}</div>
        <a :style="closeButtonStyle" class="node-close" @click.stop="deleteNode(node.id)" @mousedown.stop>&times;</a>
      </div>
    </foreignObject>
    
  </g>
</template>

<style scoped>
.close:hover {
  cursor: pointer;
}

.node-container {
  border: 2px solid #00FF00;
  height: 100%;
  width: 100%;
  position: relative;
  background-color: black;
}

.node-close {
  position: absolute;
  top: 0px;
  right: 0px;
  width: var(--size);
  height: var(--size);
  line-height: var(--size);
  font-size: var(--font-size);
  text-align: center;
  color: #00FF00;
}

.node-title {
  pointer-events: none;
}

.node-title, .node-close {
  height: var(--size);
  line-height: var(--size);
  font-size: var(--font-size);
  color: #00FF00;
  user-select: none;
}

.node-title {

}
</style>