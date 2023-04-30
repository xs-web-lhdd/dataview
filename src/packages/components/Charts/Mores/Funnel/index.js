import { ChatCategoryEnum, ChatCategoryEnumName, PackagesCategoryEnum, ChartFrameEnum } from '@/enums/packageEnum.js'

export const FunnelConfig = {
  key: 'Funnel',
  chartKey: 'VFunnel',
  conKey: 'VCFunnel',
  title: '漏斗图',
  category: ChatCategoryEnum.MORE,
  categoryName: ChatCategoryEnumName.MORE,
  package: PackagesCategoryEnum.CHARTS,
  chartFrame: ChartFrameEnum.ECHARTS,
  image: 'funnel.png'
}
