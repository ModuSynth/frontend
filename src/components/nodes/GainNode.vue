<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class GainNode extends Vue {

}
</script>

<template>
  <g>
    <rect fill="black" stroke="#00FF00" stroke-width="3" width="160" height="100" x="0" y="O" />
    <text x="5" y="20" fill="#00FF00">Gain Node</text>
  </g>
</template>