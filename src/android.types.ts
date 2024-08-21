export enum ANDROID_SIZES {
  MDPI = "mdpi",
  HDPI = "hdpi",
  XHDPI = "xhdpi",
  XXHDPI = "xxhdpi",
  XXXHDPI = "xxxhdpi",
}

export const ANDROID_FORMAT_TO_SIZE: Record<ANDROID_SIZES, number> = {
  [ANDROID_SIZES.MDPI]: 48,
  [ANDROID_SIZES.HDPI]: 72,
  [ANDROID_SIZES.XHDPI]: 96,
  [ANDROID_SIZES.XXHDPI]: 144,
  [ANDROID_SIZES.XXXHDPI]: 192,
};

export const ANDROID_FORMAT_TO_FILE_NAME: Record<ANDROID_SIZES, string> = {
  [ANDROID_SIZES.MDPI]: "mipmap-mdpi",
  [ANDROID_SIZES.HDPI]: "mipmap-hdpi",
  [ANDROID_SIZES.XHDPI]: "mipmap-xhdpi",
  [ANDROID_SIZES.XXHDPI]: "mipmap-xxhdpi",
  [ANDROID_SIZES.XXXHDPI]: "mipmap-xxxhdpi",
};

export const ANDROID_RESOURCES_PATH = "android/app/src/main/res";

// export const
