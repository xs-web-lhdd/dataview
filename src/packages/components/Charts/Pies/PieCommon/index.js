import { ChatCategoryEnum, ChatCategoryEnumName, PackagesCategoryEnum, ChartFrameEnum } from '@/enums/packageEnum.js'

export const PieCommonConfig = {
  key: 'PieCommon',
  chartKey: 'VPieCommon',
  conKey: 'VCPieCommon',
  title: '饼图',
  category: ChatCategoryEnum.PIE,
  categoryName: ChatCategoryEnumName.PIE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'pie.png'
}
