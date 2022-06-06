<script lang="ts">
import IStage from '@/interfaces/IStage';
import { StageActionTypes } from '@/store/stages/enums';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings';

const ns: BindingHelpers = namespace('stages')

@Component
export default class StagesList extends Vue {

  private headers = [
    {text: 'ID', value: 'id'},
    {text: 'Name', value: 'name'},
    {text: 'Nodes', value: 'nodes_count'},
    {text: 'Links', value: 'links_count'},
    {text: 'Actions', value: 'actions'},
  ]

  @ns.State('list') stages!: IStage[];

  @ns.Action(StageActionTypes.FETCH_LIST) fetchlist: any;

  public mounted() {
    this.fetchlist();
  }
}
</script>

<template>
  <v-container>
    <v-layout child-flex>
      <v-data-table fluid :headers="headers" :items="stages" class="elevation-1">
        <template v-slot:item.actions="{ item }">
          <v-btn icon :to="`/${item.id}`">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>