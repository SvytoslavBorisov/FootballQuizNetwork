import type { ImageSourcePropType } from 'react-native';

export const CLUB_BACKGROUND_IMAGES = {
  club_akron: require('../clubs/carousel/backgrounds/club_akron.webp'),
  club_akhmat: require('../clubs/carousel/backgrounds/club_krasnodar.webp'),
  club_baltika: require('../clubs/carousel/backgrounds/club_dinmos.webp'),
  club_dinmah: require('../clubs/carousel/backgrounds/club_dinmos.webp'),
  club_dinmos: require('../clubs/carousel/backgrounds/club_dinmos.webp'),
  club_zenit: require('../clubs/carousel/backgrounds/club_zenit.webp'),
  club_krasnodar: require('../clubs/carousel/backgrounds/club_krasnodar.webp'),
  club_spartak: require('../clubs/carousel/backgrounds/club_akron.webp'),
  club_cska: require('../clubs/carousel/backgrounds/club_akron.webp'),
  club_loko: require('../clubs/carousel/backgrounds/club_krasnodar.webp'),
  club_rostov: require('../clubs/carousel/backgrounds/club_rostov.webp'),
  club_rubin: require('../clubs/carousel/backgrounds/club_rubin.webp'),
  club_ks: require('../clubs/carousel/backgrounds/club_dinmos.webp'),
  club_orenburg: require('../clubs/carousel/backgrounds/club_dinmos.webp'),
  club_fakel: require('../clubs/carousel/backgrounds/club_fakel.webp'),
  club_rodina: require('../clubs/carousel/backgrounds/club_rodina.webp'),
  stadium_rpl: require('../clubs/carousel/backgrounds/stadium_rpl.webp'),
  stadium_fnl: require('../clubs/carousel/backgrounds/stadium_fnl.webp'),
  stadium_pfl: require('../clubs/carousel/backgrounds/stadium_rpl.webp'),
  logo_rpl: require('../clubs/carousel/backgrounds/logo_rpl.webp'),
  logo_fnl: require('../clubs/carousel/backgrounds/logo_fnl.webp'),
  logo_fnl2: require('../clubs/carousel/backgrounds/logo_rpl.webp'),
  logo_twolig: require('../clubs/carousel/backgrounds/logo_rpl.webp'),
  logo_media: require('../clubs/carousel/backgrounds/logo_media.webp'),
  logo_hidden: require('../clubs/carousel/backgrounds/logo_hidden.webp'),
} as const satisfies Record<string, ImageSourcePropType>;

export type ClubBackgroundId = keyof typeof CLUB_BACKGROUND_IMAGES;

export function getClubBackgroundSource(
  packId: string,
): ImageSourcePropType | null {
  return CLUB_BACKGROUND_IMAGES[packId as ClubBackgroundId] ?? null;
}
