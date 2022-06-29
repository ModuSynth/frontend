<script lang="ts">
import { NodeActionTypes } from '@/store/nodes/enums';
import ns from '@/utils/ns';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {
  public types: string[] = ['GainNode', 'OscillatorNode', 'output']

  @ns.nodes.Action(NodeActionTypes.CREATE) createNode: any;
}
</script>

<template>
  <div class="toolbar-wrapper">
    <v-menu bottom>
      <template v-slot:activator="{ on, attrs }">
        <a v-bind="attrs" v-on="on" class="toolbar-tool">Ajouter Node</a>
      </template>
      <div class="toolbar-popdown">
        <a class="toolbar-option" v-for="type in types" @click="createNode(type)">
          {{ $t(`nodes.types.${type}`) }}
        </a>
      </div>
    </v-menu>
  </div>
</template>

<style scoped>
.toolbar-wrapper {
  height: 30px;
  width: 100vw;
  border-bottom: 2px solid #00FF00;
  box-sizing: border-box;
  background-color: black;
}

.toolbar-tool {
  border-right: 2px solid #00FF00;
  display: inline-block;
  height: 30px;
  padding: 0px 10px;
  color: #00FF00;
  line-height: 28px;
}

.toolbar-tool:hover {
  background-color: #005500;
  border-bottom: 2px solid #00FF00;
}

.toolbar-popdown {
  background-color: black;
  border: 2px solid #00FF00;
  min-width: 100px;
}

.toolbar-option {
  color: #00FF00;
  display: block;
  height: 30px;
  padding: 0 5px;
  line-height: 28px;
}

.toolbar-option:hover {
  background-color: #005500;
}
.toolbar-option:not(:first-child) {
  border-top: 2px solid #00FF00;
}
</style>