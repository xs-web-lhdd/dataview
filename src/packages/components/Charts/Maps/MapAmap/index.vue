<template>
  <div ref="vChartRef"></div>
</template>

<script setup>
import { ref, toRefs, watch } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import { useChartDataFetch } from "@/hooks";
import { useChartEditStore } from "@/store/modules/chartEditStore/index.js";
import { MarkerEnum } from "./config";
import { isArray } from "@/utils";

const props = defineProps({
  chartConfig: {
    type: Object,
    required: true,
  },
});
let {
  amapKey,
  amapStyleKey,
  amapLon,
  amapLat,
  amapZindex,
  mapMarkerType,
  lang,
  amapStyleKeyCustom,
  features,
  viewMode,
  pitch,
  skyColor,
  marker,
} = toRefs(props.chartConfig.option.mapOptions);

let mapIns = null;
let markers = [];
let AMapIns = null;
const vChartRef = ref();

const initMap = (newData) => {
  // 初始化
  AMapLoader.load({
    key: amapKey.value, //api服务key--另外需要在public中使用安全密钥！！！
    version: "1.4.8", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.PlaceSearch", "AMap.AutoComplete"], // 需要使用的的插件列表
  })
    .then((AMap) => {
      AMapIns = AMap;
      mapIns = new AMap.Map(vChartRef.value, {
        resizeEnable: true,
        zoom: amapZindex.value, // 地图显示的缩放级别
        center: [amapLon.value, amapLat.value],
        mapStyle: `amap://styles/${
          amapStyleKeyCustom.value !== ""
            ? amapStyleKeyCustom.value
            : amapStyleKey.value
        }`, //自定义地图的显示样式
        lang: lang.value,
        features: features.value,
        pitch: pitch.value, // 地图俯仰角度，有效范围 0 度- 83 度
        skyColor: skyColor.value,
        viewMode: viewMode.value, // 地图模式
        willReadFrequently: true,
      });
      dataHandle(props.chartConfig.option.dataset);
    })
    .catch((e) => {});
};

const dataHandle = (newData) => {
  if (!mapIns && !AMapIns) {
    initMap(props.chartConfig.option);
    return;
  }
  if (isArray(newData.markers)) {
    // 先清除旧标记
    mapIns.remove(markers);
    markers = [];
    // 记录新标记
    if (mapMarkerType.value === MarkerEnum.MARKER) {
      newData.markers.forEach((markerItem) => {
        const markerInstance = new AMapIns.Marker({
          position: [markerItem.position[0], markerItem.position[1]],
          offset: new AMapIns.Pixel(-13, -30),
        });
        markers.push(markerInstance);
        markerInstance.setMap(mapIns);
      });
    } else if (mapMarkerType.value === MarkerEnum.CIRCLE_MARKER) {
      newData.markers.forEach((markerItem) => {
        const markerInstance = new AMapIns.CircleMarker({
          center: [markerItem.position[0], markerItem.position[1]],
          radius: markerItem.value,
          ...marker.value,
        });
        markers.push(markerInstance);
        markerInstance.setMap(mapIns);
      });
    }
  }
};

const stopWatch = watch(
  () => props.chartConfig.option.mapOptions,
  (option) => {
    initMap(option);
  },
  {
    immediate: true,
    deep: true,
  }
);

watch(
  () => props.chartConfig.option.dataset,
  (newData) => {
    try {
      dataHandle(newData);
    } catch (error) {
      console.log(error);
    }
  },
  {
    deep: false,
  }
);

// 预览
useChartDataFetch(props.chartConfig, useChartEditStore, (newData) => {
  stopWatch();
  dataHandle(newData);
});
</script>
