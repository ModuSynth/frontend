<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IParameter, { INumberParameter } from '@/interfaces/IParameter'

@Component
export default class NumberParameter extends Vue {
  @Prop() parameter!: IParameter;

  @Prop() index!: number;

  public get parsedParameter(): INumberParameter {
    return this.parameter as INumberParameter;
  }
}
</script>

<template>
  <g :transform="`translate(10, ${30 + (40 * this.index)})`">
    <g transform="translate(0 0)">
      <rect height="30" width="195" x="0" y="0" stroke="#00FF00" stroke-width="3" />
      <text x="5" y="18" fill="#00FF00">{{ parameter.name}} : {{ parsedParameter.value }}</text>
    </g>
    <g transform="translate(0 30)">
      <g transform="translate(0, 0)">
        <rect x="0" y="0" width="40" height="20" stroke="#00FF00" stroke-width="3" />
        <text fill="#00FF00" x="5" y="15">-100</text>
      </g>
      <g transform="translate(40 0)">
        <rect x="0" y="0" width="30" height="20" stroke="#00FF00" stroke-width="3" />
        <text fill="#00FF00" x="5" y="15">-10</text>
      </g>
      <g transform="translate(70, 0)">
        <rect x="0" y="0" width="20" height="20" stroke="#00FF00" stroke-width="3" />
        <text fill="#00FF00" x="5" y="15">-1</text>
      </g>
      <g transform="translate(90, 0)">
        <rect x="0" y="0" width="25" height="20" stroke="#00FF00" stroke-width="3" />
        <text fill="#00FF00" x="5" y="15">+1</text>
      </g>
      <g transform="translate(115 0)">
        <rect x="0" y="0" width="35" height="20" stroke="#00FF00" stroke-width="3" />
        <text fill="#00FF00" x="5" y="15">+10</text>
      </g>
      <g transform="translate(150, 0)">
        <rect x="0" y="0" width="45" height="20" stroke="#00FF00" stroke-width="3" />
        <text fill="#00FF00" x="5" y="15">+100</text>
      </g>
    </g>
  </g>
</template>