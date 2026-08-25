import type { ImageSourcePropType } from 'react-native';

export const UI_ASSETS = {
  appIcon: require('../menu/decorations/icon_logo.webp'),
  backgrounds: {
    main: require('../app/backgrounds/background.webp'),
    logo: require('../app/backgrounds/background_logo.webp'),
    rpl: require('../app/backgrounds/back_rpl.webp'),
  },
  menu: {
    playButton: require('../menu/buttons/play_button_test.webp'),
    settingsButton: require('../menu/buttons/setting_button.webp'),
    nextButton: require('../menu/buttons/next_button3.webp'),
    toWinButton: require('../menu/buttons/towin_button.webp'),
    ball: require('../menu/decorations/icon_ball_bitmap.webp'),
  },
  resultFrames: {
    win: require('../menu/decorations/frame_modal_win.webp'),
    lose: require('../menu/decorations/frame_modal_lose.webp'),
    winWithInfo: require('../menu/decorations/frame_modal_win_with_i.webp'),
    loseWithInfo: require('../menu/decorations/frame_modal_lose_with_i.webp'),
  },
  ads: {
    glinda: require('../ads/glinda.webp'),
  },
} as const satisfies Record<
  string,
  ImageSourcePropType | Record<string, ImageSourcePropType>
>;
