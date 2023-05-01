<!-- <template>
  <div>
    <n-countdown
      ref="countdownRef"
      :duration="totalDuration"
      :render="renderCountdown"
      :active="countdownActive"
      v-show="false"
    />
    <n-space
      class="go-decorates-more-countdown"
      :size="flipperGap"
      align="center"
      justify="center"
    >
      <template v-if="showDay">
        <flipper
          :count="item"
          :width="flipperWidth"
          :height="flipperHeight"
          :front-color="flipperTextColor"
          :back-color="flipperBgColor"
          :radius="flipperRadius"
          :flip-type="flipperType"
          :duration="flipperSpeed"
          v-for="(item, index) in daysFlipperData"
          :key="index"
          class="go-d-block"
        />
        <div v-if="style === '时分秒'">天</div>
        <div v-else>:</div>
      </template>
      <flipper
        :count="item"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :flip-type="flipperType"
        :duration="flipperSpeed"
        v-for="(item, index) in hoursFlipperData"
        :key="index"
        class="go-d-block"
      />
      <div v-if="style === '时分秒'">时</div>
      <div v-else>:</div>
      <flipper
        :count="item"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :flip-type="flipperType"
        :duration="flipperSpeed"
        v-for="(item, index) in minutesFlipperData"
        :key="index"
        class="go-d-block"
      />
      <div v-if="style === '时分秒'">分</div>
      <div v-else>:</div>
      <flipper
        :count="item"
        :width="flipperWidth"
        :height="flipperHeight"
        :front-color="flipperTextColor"
        :back-color="flipperBgColor"
        :radius="flipperRadius"
        :flip-type="flipperType"
        :duration="flipperSpeed"
        v-for="(item, index) in secondsFlipperData"
        :key="index"
        class="go-d-block"
      />
      <div v-if="style === '时分秒'">秒</div>
    </n-space>
  </div>
</template>

<script setup>
import { toRefs, watch, ref, onMounted } from "vue";
import { Flipper } from "@/components/Pages/Flipper";
import {
  CountdownInst,
  CountdownProps,
} from "naive-ui/es/countdown/src/Countdown";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});

const { w, h } = toRefs(props.chartConfig.attr);

const {
  dataset,
  useEndDate,
  endDate,
  style,
  showDay,
  flipperBgColor,
  flipperTextColor,
  flipperWidth,
  flipperHeight,
  flipperRadius,
  flipperGap,
  flipperType,
  flipperSpeed,
} = toRefs(props.chartConfig.option);

const countdownRef = ref();
const countdownActive = ref(false);

const totalDuration = ref(dataset.value * 1000);
const daysFlipperData = ref([]);
const hoursFlipperData = ref([]);
const minutesFlipperData = ref([]);
const secondsFlipperData = ref([]);
const getFlipperData = (val) => {
  const len = Math.max(val.toString().length, 2);
  return val
    .toString()
    .padStart(len, "0") // 左侧填充|右对齐
    .split(""); // 转数组
};
const updateDatasetHandler = (hours, minutes, seconds) => {
  const days = Math.floor(hours / 24);
  daysFlipperData.value = getFlipperData(days);
  hoursFlipperData.value = getFlipperData(showDay.value ? hours % 24 : hours);
  minutesFlipperData.value = getFlipperData(minutes);
  secondsFlipperData.value = getFlipperData(seconds);
};

const renderCountdown = ({ hours, minutes, seconds }) => {
  updateDatasetHandler(hours, minutes, seconds);
};

const updateTotalDuration = () => {
  try {
    countdownActive.value = false;
    totalDuration.value = useEndDate.value
      ? endDate.value - new Date().getTime()
      : dataset.value * 1000;
    countdownRef.value?.reset && countdownRef.value?.reset();
    countdownActive.value = true;
  } catch (error) {
    console.log(error);
  }
};

watch(
  () => props.chartConfig.option.dataset,
  () => {
    updateTotalDuration();
  },
  {
    immediate: true,
  }
);
watch(
  () => props.chartConfig.option.endDate,
  () => {
    updateTotalDuration();
  },
  {
    immediate: true,
  }
);
watch(
  () => props.chartConfig.option.useEndDate,
  () => {
    updateTotalDuration();
  },
  {
    immediate: true,
  }
);

onMounted(() => {
  updateTotalDuration();
});
</script>

<style lang="scss" scoped>
.go-decorates-more-countdown {
  width: v-bind("`${w}px`");
  height: v-bind("`${h}px`");
  font-size: v-bind("`${flipperWidth}px`");
  line-height: v-bind("`${flipperHeight}px`");
  color: v-bind("flipperTextColor");
  user-select: none;
}
</style> -->

<template></template>
