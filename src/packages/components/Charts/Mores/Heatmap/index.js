import { ChatCategoryEnum, ChatCategoryEnumName, PackagesCategoryEnum, ChartFrameEnum } from '@/enums/packageEnum.js'

export const HeatmapConfig = {
  key: 'Heatmap',
  chartKey: 'VHeatmap',
  conKey: 'VCHeatmap',
  title: '热力图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.COMMON,
  image: 'heatmap.png'
}
