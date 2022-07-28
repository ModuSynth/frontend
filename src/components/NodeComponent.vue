<script lang="ts">
import { NodeActionTypes, NodeMutationTypes } from '@/store/nodes/enums';
import ns from '@/utils/ns';
import { Component, Prop, Vue } from 'vue-property-decorator';
import GainNode from './nodes/GainNode.vue'
import OscillatorNode from './nodes/OscillatorNode.vue';
import ChannelMergerNode from './nodes/ChannelMergerNode.vue';
import { NODE_PADDING, PARAM_WIDTH, NODE_CLOSE_SIZE, NODE_TITLE_HEIGHT, NODE_TITLE_WIDTH, PORT_RADIUS, PORT_TOP_MARGIN } from '@/utils/constants';
import OutputNode from './nodes/OutputNode.vue';
import { portsHeight, portsY } from '@/utils/geometry/ports';
import Node from '@/interfaces/implementations/Node'


/**
 * A node wrapper is a component displaying every node in the same way. It helps at providing
 * a standard node display for each and every type of node. Parameters are dynamically displayed
 * depending on their type (number parameter or list value parameter).
 * @author Vincent Courtois <courtois.vincent@outlook.com>
 */
@Component({
  components: { GainNode, OscillatorNode, ChannelMergerNode, OutputNode }
})
export default class NodeWrapper extends Vue {
  @Prop() readonly node!: Node;

  @ns.nodes.Mutation(NodeMutationTypes.START_DRAG) startDrag: any;

  @ns.nodes.Action(NodeActionTypes.DELETE) deleteNode: any;

  public get titleStyle() {
    return {
      "--size": `${NODE_TITLE_HEIGHT}px`,
      "--font-size": `${NODE_TITLE_HEIGHT}px`,
      "--width": `${NODE_TITLE_WIDTH}px`
    }
  }

  public get closeButtonStyle() {
    return {"--size": `${NODE_CLOSE_SIZE}px`, "--font-size": `${NODE_CLOSE_SIZE + 6}px`}
  }

  public get containerStyle() {
    return {"--padding": `${NODE_PADDING}px`};
  }

  public get width(): number {
    return PARAM_WIDTH + 2 * NODE_PADDING;
  }

  public get height(): number {
    return NODE_TITLE_HEIGHT + 2 * NODE_PADDING;
  }

  public get radius() {
    return PORT_RADIUS
  }

  public portsHeight(numberOfPorts: number): number {
    return portsHeight(numberOfPorts)
  }

  public portsY(numberOfPorts: number): number {
    return portsY(this.node, numberOfPorts);
  }
}
</script>

<template>
  <g
    :transform="`translate(${node.x} ${node.y})`"
  >
    <g :transform="`translate(0 ${portsY(node.inputs.length)})`">
      <InputPort v-for="port in node.inputs" :port="port" :key="`input-${node.id}.${port.index}`" />
    </g>
    <g :transform="`translate(${node.width} ${portsY(node.outputs.length)})`">
      <OutputPort v-for="port in node.outputs" :port="port" :key="`output-${node.id}.${port.index}`" />
    </g>
    <foreignObject
      :width="node.width"
      :height="node.height"
    >
      <div class="node-container" @mousedown.left.stop="startDrag({node, $event})">
        <div class="node-element node-topbar" :style="containerStyle">
          <div :style="titleStyle" class="node-title text-truncate">{{ $t(`nodes.types.${node.type}`) }}</div>
          <a :style="closeButtonStyle" class="node-close" @click.stop="deleteNode(node.id)" @mousedown.stop>&times;</a>
        </div>
        <div class="node-element" :style="containerStyle">
          <component :is="node.type" :node="node"></component>
        </div>
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
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  position: relative;
  background-color: black;
}
.node-element {
  padding: var(--padding);
}

.node-topbar {
  border-bottom: 1px solid #00FF00;
}

.node-close {
  position: absolute;
  top: var(--padding);
  right: var(--padding);
  width: var(--size);
  max-width: var(--size);
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
  width: var(--width);
  color: #00FF00;
  user-select: none;
  vertical-align: center;
}

.node-title {

}
</style>