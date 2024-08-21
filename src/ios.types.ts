export enum IOS_SIZES {
  ICON_60_2X = "icon-60@2x",
  ICON_60_3X = "icon-60@3x",
  ICON_76_1X = "icon-76@1x",
  ICON_76_2X = "icon-76@2x",
  ICON_83_5_2X = "icon-83.5@2x",
  ICON_40_2X = "icon-40@2x",
  ICON_40_3X = "icon-40@3x",
  ICON_29_2X = "icon-29@2x",
  ICON_29_3X = "icon-29@3x",
  ICON_20_2X = "icon-20@2x",
  ICON_20_3X = "icon-20@3x",
}

export const IOS_FORMAT_TO_SIZE: Record<IOS_SIZES, number> = {
  [IOS_SIZES.ICON_60_2X]: 120,
  [IOS_SIZES.ICON_60_3X]: 180,
  [IOS_SIZES.ICON_76_1X]: 76,
  [IOS_SIZES.ICON_76_2X]: 152,
  [IOS_SIZES.ICON_83_5_2X]: 167,
  [IOS_SIZES.ICON_40_2X]: 80,
  [IOS_SIZES.ICON_40_3X]: 120,
  [IOS_SIZES.ICON_29_2X]: 58,
  [IOS_SIZES.ICON_29_3X]: 87,
  [IOS_SIZES.ICON_20_2X]: 40,
  [IOS_SIZES.ICON_20_3X]: 60,
};

export const IOS_FORMAT_TO_FILE_NAME: Record<IOS_SIZES, string> = {
  [IOS_SIZES.ICON_60_2X]: "icon-60@2x.png",
  [IOS_SIZES.ICON_60_3X]: "icon-60@3x.png",
  [IOS_SIZES.ICON_76_1X]: "icon-76@1x.png",
  [IOS_SIZES.ICON_76_2X]: "icon-76@2x.png",
  [IOS_SIZES.ICON_83_5_2X]: "icon-83.5@2x.png",
  [IOS_SIZES.ICON_40_2X]: "icon-40@2x.png",
  [IOS_SIZES.ICON_40_3X]: "icon-40@3x.png",
  [IOS_SIZES.ICON_29_2X]: "icon-29@2x.png",
  [IOS_SIZES.ICON_29_3X]: "icon-29@3x.png",
  [IOS_SIZES.ICON_20_2X]: "icon-20@2x.png",
  [IOS_SIZES.ICON_20_3X]: "icon-20@3x.png",
};
