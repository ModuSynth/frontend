<script lang="ts">
import { StageActionTypes, StageMutationTypes } from '@/store/stages/enums';
import { Component, Vue } from 'vue-property-decorator';
import Toolbar from '@/components/Toolbar.vue'
import { IStageDetails } from '@/interfaces/IStage';
import NodeWrapper from '@/components/NodeWrapper.vue'
import ns from '@/utils/ns';
import INode from '@/interfaces/INode'
import { NodeActionTypes, NodeMutationTypes } from '@/store/nodes/enums';
import ILink from '@/interfaces/ILink';
import LinkWrapper from '../../components/LinkWrapper.vue';
import ParamLinkWrapper from '../../components/ParamLinkWrapper.vue';

@Component({
  components: { NodeWrapper, Toolbar, LinkWrapper, ParamLinkWrapper }
})
export default class StagesList extends Vue {

  @ns.stages.State('stage') stage!: IStageDetails;

  @ns.stages.State('scale') scale!: number;

  @ns.nodes.State('nodes') nodes!: INode[];

  @ns.nodes.State('loaded') loaded!: boolean;

  @ns.links.State('links') links!: ILink[];

  @ns.links.State('paramLinks') paramLinks!: ILink[];

  @ns.nodes.Action(NodeActionTypes.FETCH_LIST) fetchNodes: any;

  @ns.stages.Action(StageActionTypes.FETCH_ONE) fetchOne: any;

  @ns.stages.Mutation(StageMutationTypes.START_DRAG) startDrag: any;

  @ns.stages.Action(StageActionTypes.SAVE_POSITION) endDrag: any;

  @ns.nodes.Action(NodeActionTypes.SAVE_POSITION) endNodeDrag: any;

  @ns.stages.Mutation(StageMutationTypes.MOVE_DRAG) moveDrag: any;

  @ns.nodes.Mutation(NodeMutationTypes.MOVE_DRAG) nodeDrag: any;

  @ns.stages.Mutation(StageMutationTypes.SET_SCALE) setScale: any;

  @ns.stages.Mutation(StageMutationTypes.CREATE_CONTEXT) createContext: any;

  public endDrags($event: MouseEvent) {
    this.endDrag({x: $event.clientX, y: $event.clientY});
    this.endNodeDrag($event)
  }

  public moveDrags($event: MouseEvent) {
    this.moveDrag({x: $event.clientX, y: $event.clientY});
    this.nodeDrag($event)
  }

  public mounted() {
    this.fetchOne(this.$route.params.id);
  }
}
</script>

<template>
  <div>
    <div class="fit-screen" v-if="loaded">
      <Toolbar />
      <svg
        v-if="nodes.length > 0"
        height="100%"
        width="100%"
        @mousedown.left="startDrag({x: $event.clientX, y: $event.clientY})"
        @mousemove="moveDrags"
        @mouseleave="endDrags"
        @mouseup="endDrags"
        @wheel.prevent="setScale($event.deltaY)"
      >
        <g :transform="`translate(${stage.x} ${stage.y}) scale(${scale} ${scale})`">
          <LinkWrapper :link="link" v-for="link in links" :key="`link-${link.id}`" />
          <NodeWrapper :node="node" v-for="node in nodes" :key="`node-${node.id}`" />
          <ParamLinkWrapper :link="link" v-for="link in paramLinks" :key="`param-link-${link.id}`" />
        </g>
      </svg>
    </div>
    <div v-else class="fit-screen loading-screen" @click="createContext(); fetchNodes($route.params.id)">
      Click anywhere to start
    </div>
  </div>
</template>

<style scoped>
.fit-screen {
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: black;
}

.loading-screen {
  color: #00FF00;
  line-height: 100vh;
  text-align: center;
}

svg {
  height: calc(100vh - 30px);
  overflow: hidden;
}
</style>