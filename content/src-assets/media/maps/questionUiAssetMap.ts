import type { ImageSourcePropType } from 'react-native';

export const QUESTION_UI_ASSETS = {
  varIcon: require('../questions/icons/icon_var.webp'),
} as const satisfies Record<string, ImageSourcePropType>;
