import type { ImageSourcePropType } from 'react-native';

const play = (source: ImageSourcePropType): ImageSourcePropType => source;

const akron = play(require('../clubs/actions/play/play_club_akron.webp'));
const dinamoMoscow = play(
  require('../clubs/actions/play/play_club_dinmos.webp'),
);
const krasnodar = play(
  require('../clubs/actions/play/play_club_krasnodar.webp'),
);
const rplStadiums = play(
  require('../clubs/actions/play/play_stadium_rpl.webp'),
);
const rplLogos = play(require('../clubs/actions/play/play_logo_rpl.webp'));

export const CLUB_PLAY_BUTTON_IMAGES: Record<string, ImageSourcePropType> = {
  club_akron: akron,
  club_akhmat: krasnodar,
  club_baltika: dinamoMoscow,
  club_dinmah: dinamoMoscow,
  club_dinmos: dinamoMoscow,
  club_zenit: require('../clubs/actions/play/play_club_zenit.webp'),
  club_krasnodar: krasnodar,
  club_spartak: akron,
  club_cska: akron,
  club_loko: krasnodar,
  club_rostov: require('../clubs/actions/play/play_club_rostov.webp'),
  club_rubin: require('../clubs/actions/play/play_club_rubin.webp'),
  club_ks: dinamoMoscow,
  club_orenburg: dinamoMoscow,
  club_fakel: require('../clubs/actions/play/play_club_fakel.webp'),
  club_rodina: require('../clubs/actions/play/play_club_rodina.webp'),
  stadium_rpl: rplStadiums,
  stadium_fnl: require('../clubs/actions/play/play_stadium_fnl.webp'),
  stadium_pfl: rplStadiums,
  logo_rpl: rplLogos,
  logo_fnl: require('../clubs/actions/play/play_logo_fnl.webp'),
  logo_fnl2: rplLogos,
  logo_twolig: rplLogos,
  logo_media: require('../clubs/actions/play/play_logo_media.webp'),
  logo_hidden: require('../clubs/actions/play/play_logo_hidden.webp'),
};

export function getClubPlayButtonSource(
  clubId: string,
): ImageSourcePropType | null {
  return CLUB_PLAY_BUTTON_IMAGES[clubId] ?? null;
}
