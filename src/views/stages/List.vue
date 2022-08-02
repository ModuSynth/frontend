<script lang="ts">
import IStage from '@/interfaces/api/IStage';
import { StageActionTypes } from '@/store/stages/enums';
import { Component, Vue } from 'vue-property-decorator';
import { namespace } from 'vuex-class'
import { BindingHelpers } from 'vuex-class/lib/bindings';

const ns: BindingHelpers = namespace('stages')

@Component
export default class StagesList extends Vue {

  public headers = [
    {text: 'ID', value: 'id'},
    {text: 'Name', value: 'name'},
    {text: 'Nodes', value: 'nodes_count'},
    {text: 'Links', value: 'links_count'},
    {text: 'Actions', value: 'actions'},
  ]

  public stageName: string = "";

  @ns.State('list') stages!: IStage[];

  @ns.Action(StageActionTypes.FETCH_LIST) fetchlist: any;

  @ns.Action(StageActionTypes.CREATE) createStage: any;

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
        <template v-slot:top>
          <v-container>
            <v-row>
              <v-col col="6">
                <v-text-field outlined dense :label="$t('stages.creation.fields.name')" v-model="stageName" />
                </v-col>
              <v-col col="6"><v-btn @click="createStage(stageName)">Create</v-btn></v-col>
            </v-row>
          </v-container>
        </template>
      </v-data-table>
    </v-layout>
  </v-container>
</template>