<script lang="ts">
import { StageActionTypes, StageMutationTypes } from '@/store/stages/enums';
import { Component, Vue } from 'vue-property-decorator';
import { BindingHelpers } from 'vuex-class/lib/bindings';
import { namespace } from 'vuex-class'
import { IStageDetails } from '@/interfaces/IStage';
import NodeWrapper from '@/components/stages/NodeWrapper.vue'

const ns: BindingHelpers = namespace('stages')

@Component({
  components: { NodeWrapper }
})
export default class StagesList extends Vue {

  @ns.State('stage') stage!: IStageDetails;

  @ns.Action(StageActionTypes.FETCH_ONE) fetchOne: any;

  @ns.Mutation(StageMutationTypes.START_DRAG) startDrag: any;

  @ns.Mutation(StageMutationTypes.END_DRAG) endDrag: any;

  @ns.Mutation(StageMutationTypes.MOVE_DRAG) moveDrag: any;

  public mounted() {
    this.fetchOne(this.$route.params.id);
  }
}
</script>

<template>
  <div class="fit-screen">
    <div class="stage-name">{{ stage.name }}</div>
    <svg
      height="100%"
      width="100%"
      @mousedown="startDrag({x: $event.clientX, y: $event.clientY})"
      @mousemove="moveDrag({x: $event.clientX, y: $event.clientY})"
      @mouseleave="endDrag()"
      @mouseup="endDrag()"
    >
      <g :transform="`translate(${stage.x} ${stage.y})`">
        <NodeWrapper v-for="node in stage.nodes" :node="node" />
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
  background-color: silver;
}

.stage-name {
  color: white;
  font-weight: bold;
  position: absolute;
  top: 0; left: 5px;
}
</style>