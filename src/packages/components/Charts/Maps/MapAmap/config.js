import { PublicConfigClass } from '@/packages/public'
import { MapAmapConfig } from './index'
import { chartInitConfig } from '@/settings/designSetting'
import cloneDeep from 'lodash/cloneDeep'
import dataJson from './data.json'

export const ThemeEnum = {
  NORMAL: 'normal',
  DARK: 'dark',
  LIGHT: 'light',
  WHITES_MOKE: 'whitesmoke',
  FRESH: 'fresh',
  GREY: 'grey',
  GRAFFITI: 'graffiti',
  MACARON: 'macaron',
  BLUE: 'blue',
  DARKBLUE: 'darkblue',
  WINE: 'wine'
}

export const LangEnum = {
  ZH_CN: 'zh_cn',
  EN: 'en',
  ZH_EN: 'zh_en'
}

export const ViewModeEnum = {
  PLANE: '2D',
  STEREOSCOPIC: '3D'
}

export const FeaturesEnum = {
  BG: 'bg',
  POINT: 'point',
  ROAD: 'road',
  BUILDING: 'building'
}

export const MarkerEnum = {
  // 圆圈
  CIRCLE_MARKER: 'CircleMarker',
  // 定位标点
  MARKER: 'Marker',
  // 暂无
  NONE: 'none'
}

export const option = {
  dataset: dataJson,
  mapOptions: {
    pitch: 60,
    skyColor: '#53A9DE',
    amapKey: 'd5f3e16589dbecae64d05fe90e2ba4f2',
    amapStyleKey: ThemeEnum.DARK,
    amapStyleKeyCustom: '',
    amapLon: 116.397428,
    amapLat: 39.90923,
    amapZindex: 11,
    marker: {
      fillColor: '#E98984FF',
      fillOpacity: 0.5,
      strokeColor: 'white',
      strokeWeight: 2,
      strokeOpacity: 0.5,
      zIndex: 10,
      bubble: true,
      cursor: 'pointer',
      clickable: true
    },
    mapMarkerType: MarkerEnum.CIRCLE_MARKER,
    viewMode: ViewModeEnum.PLANE,
    lang: LangEnum.ZH_CN,
    features: [FeaturesEnum.BG, FeaturesEnum.POINT, FeaturesEnum.ROAD, FeaturesEnum.BUILDING]
  }
}

export default class Config extends PublicConfigClass {
  key = MapAmapConfig.key
  attr = { ...chartInitConfig, w: 1000, h: 800, zIndex: -1 }
  chartConfig = cloneDeep(MapAmapConfig)
  option = cloneDeep(option)
}
