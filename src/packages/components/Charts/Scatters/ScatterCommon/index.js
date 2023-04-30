import { ChatCategoryEnum, ChatCategoryEnumName, PackagesCategoryEnum, ChartFrameEnum } from '@/enums/packageEnum.js'

export const ScatterCommonConfig = {
  key: 'ScatterCommon',
  chartKey: 'VScatterCommon',
  conKey: 'VCScatterCommon',
  title: '散点图',
  category: ChatCategoryEnum.SCATTER,
  categoryName: ChatCategoryEnumName.SCATTER,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'scatter-multi.png'
}
