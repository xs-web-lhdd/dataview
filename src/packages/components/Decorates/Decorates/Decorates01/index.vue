<template>
  <svg :width="w" :height="h">
    <rect
      :x="rectX"
      :y="rectY"
      :width="w"
      :height="lineHeight"
      :fill="colors[0]"
    >
      <animate
        attributeName="width"
        from="0"
        :to="w"
        :dur="`${dur}s`"
        calcMode="spline"
        keyTimes="0;1"
        keySplines=".42,0,.58,1"
        repeatCount="indefinite"
      />
    </rect>

    <rect
      :x="rectX"
      :y="rectY"
      :width="endWidth"
      :height="lineHeight"
      :fill="colors[1]"
    >
      <animate
        attributeName="x"
        from="0"
        :to="w"
        :dur="`${dur}s`"
        calcMode="spline"
        keyTimes="0;1"
        keySplines="0.42,0,0.58,1"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
</template>

<script setup>
import { computed, toRefs } from "vue";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

const { w, h } = toRefs(props.chartConfig.attr);
const { colors, dur, endWidth, lineHeight } = toRefs(props.chartConfig.option);

const rectX = computed(() => 0);
const rectY = computed(() => h.value / 2);
</script>
