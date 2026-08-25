import type { ImageSourcePropType } from 'react-native';

export const CUP_ASSETS = {
  background: require('../cup/themes/gold/background.webp'),
  completedBackground: require('../cup/themes/gold/background_win_trophy.webp'),
  setupIcon: require('../cup/themes/gold/kubik.webp'),
  loadIcon: require('../cup/themes/gold/icon_load.webp'),
  unknownOpponent: require('../cup/themes/gold/no_logo.webp'),
  playButton: require('../cup/themes/gold/play_button.webp'),
  statsButton: require('../cup/themes/gold/static_button.webp'),
  drawButton: require('../cup/themes/gold/zereb_button.webp'),
  stopDrawButton: require('../cup/themes/gold/stop_button.webp'),
  nextButton: require('../cup/themes/gold/nextButton.webp'),
  animatedNextButton: require('../cup/themes/gold/nextButton1.webp'),
  trophyRoomButton: require('../cup/themes/gold/title_button.webp'),
  finalCarousel: require('../cup/themes/gold/achievement_carusel.webp'),
  supercupCarousel: require('../cup/themes/gold/achievement_carusel_supercup.webp'),
  supercupRplBadge: require('../clubs/branding/badges/league_rpl.webp'),
} as const satisfies Record<string, ImageSourcePropType>;
