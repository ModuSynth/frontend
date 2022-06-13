<script lang="ts">
import { StageActionTypes, StageMutationTypes } from '@/store/stages/enums';
import { Component, Vue } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue'
import { IStageDetails } from '@/interfaces/IStage';
import NodeWrapper from '@/components/NodeWrapper.vue'
import ns from '@/utils/ns';
import INode from '@/interfaces/INode'
import { NodeActionTypes } from '@/store/nodes/enums';

@Component({
  components: { NodeWrapper, Toolbar }
})
export default class StagesList extends Vue {

  @ns.stages.State('stage') stage!: IStageDetails;

  @ns.stages.State('scale') scale!: number;

  @ns.nodes.State('nodes') nodes!: INode[];

  @ns.nodes.Action(NodeActionTypes.FETCH_LIST) fetchNodes: any;

  @ns.stages.Action(StageActionTypes.FETCH_ONE) fetchOne: any;

  @ns.stages.Mutation(StageMutationTypes.START_DRAG) startDrag: any;

  @ns.stages.Action(StageActionTypes.SAVE_POSITION) endDrag: any;

  @ns.stages.Mutation(StageMutationTypes.MOVE_DRAG) moveDrag: any;

  @ns.stages.Mutation(StageMutationTypes.SET_SCALE) setScale: any;

  public mounted() {
    this.fetchOne(this.$route.params.id);
    this.fetchNodes(this.$route.params.id);
  }
}
</script>

<template>
  <div class="fit-screen">
    <Toolbar />
    <svg
      height="100%"
      width="100%"
      @mousedown.left="startDrag({x: $event.clientX, y: $event.clientY})"
      @mousemove="moveDrag({x: $event.clientX, y: $event.clientY})"
      @mouseleave="endDrag({x: $event.clientX, y: $event.clientY})"
      @mouseup="endDrag({x: $event.clientX, y: $event.clientY})"
      @wheel.prevent="setScale($event.deltaY)"
    >
      <g :transform="`translate(${stage.x} ${stage.y}) scale(${scale} ${scale})`">
        <NodeWrapper :node="node" v-for="node in nodes" :key="node.id" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
.fit-screen {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
}

svg {
  height: calc(100vh - 30px);
  overflow: hidden;
  background-color: black;
}
</style>