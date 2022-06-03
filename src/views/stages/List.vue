<script lang="ts">
import IStage from '@/interfaces/IStage';
import { StageActionTypes } from '@/store/stages/enums';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class'

@Component
export default class StagesList extends Vue {
  @namespace('stages').State('list') stages!: IStage[];

  @namespace('stages').Action(StageActionTypes.FETCH_LIST) fetchlist: any;

  public mounted() {
    this.fetchlist();
  }
}
</script>

<template>
  <v-container>
    <v-row>
      {{ stages }}
    </v-row>
  </v-container>
</template>