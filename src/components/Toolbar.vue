<script lang="ts">
import { NodeActionTypes } from '@/store/nodes/enums';
import { API_URL } from '@/utils/constants';
import ns from '@/utils/ns';
import axios from 'axios';
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Toolbar extends Vue {
  
  public tools: any = {}

  public mounted() {
    axios.get(`${API_URL}/tools`).then(({ data }) => {
      this.tools = data
    })
  }

  @ns.nodes.Action(NodeActionTypes.CREATE) createNode: any;
}
</script>

<template>
  <div class="toolbar-wrapper">
    <v-menu bottom v-for="(tool, name) in tools" :key="name">
      <template v-slot:activator="{ on, attrs }">
        <a v-bind="attrs" v-on="on" class="toolbar-tool">{{ name }}</a>
      </template>
      <div class="toolbar-popdown">
        <a class="toolbar-option" v-for="type in tool" @click="createNode(type)" :key="type">
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