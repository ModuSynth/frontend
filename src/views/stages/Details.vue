<script lang="ts">
import { StageActionTypes, StageMutationTypes } from '@/store/stages/enums';
import { Component, Vue } from 'vue-property-decorator';
import { BindingHelpers } from 'vuex-class/lib/bindings';
import { namespace } from 'vuex-class'
import { IStageDetails } from '@/interfaces/IStage';
import NodeWrapper from '@/components/stages/NodeWrapper.vue'
import ns from '@/utils/ns';
import INode from '@/interfaces/INode'

@Component({
  components: { NodeWrapper }
})
export default class StagesList extends Vue {

  @ns.stages.State('stage') stage!: IStageDetails;

  @ns.stages.State('scale') scale!: number;

  @ns.nodes.State('nodes') nodes!: INode[];

  @ns.stages.Action(StageActionTypes.FETCH_ONE) fetchOne: any;

  @ns.stages.Mutation(StageMutationTypes.START_DRAG) startDrag: any;

  @ns.stages.Mutation(StageMutationTypes.END_DRAG) endDrag: any;

  @ns.stages.Mutation(StageMutationTypes.MOVE_DRAG) moveDrag: any;

  @ns.stages.Mutation(StageMutationTypes.SET_SCALE) setScale: any;

  public mounted() {
    this.fetchOne(this.$route.params.id);
  }

  public displayMenu() {
    console.log("patate");
  }
}
</script>

<template>
  <div class="fit-screen">
    <div class="stage-name">{{ stage.name }}</div>
    <svg
      height="100%"
      width="100%"
      @mousedown.left="startDrag({x: $event.clientX, y: $event.clientY})"
      @mousemove="moveDrag({x: $event.clientX, y: $event.clientY})"
      @mouseleave="endDrag()"
      @mouseup="endDrag()"
      @wheel.prevent="setScale($event.deltaY)"
      @contextmenu="displayMenu()"
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
  background-color: black;
}

.stage-name {
  color: white;
  font-weight: bold;
  position: absolute;
  top: 0; left: 5px;
}
</style>