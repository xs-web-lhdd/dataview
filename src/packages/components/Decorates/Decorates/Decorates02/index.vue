<template>
  <div
    class="go-decorates-2"
    :style="`width:${w}px; height: ${lineHeight}px animation-duration:${dur}s`"
  >
    <svg :width="w" :height="3">
      <polyline :stroke="colors[0]" :points="`0, 2.5 ${w}, 2.5`" />
      <polyline
        :stroke="colors[1]"
        stroke-width="3"
        stroke-dasharray="20, 80"
        stroke-dashoffset="-30"
        :points="`0, 2.5 ${w}, 2.5`"
      />
    </svg>
  </div>
</template>

<script setup>
import { toRefs } from "vue";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

const { w, h } = toRefs(props.chartConfig.attr);
const { colors, dur, lineHeight } = toRefs(props.chartConfig.option);
</script>
<style lang="scss" scoped>
.go-decorates-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
