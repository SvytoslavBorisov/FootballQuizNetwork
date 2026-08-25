import type { ImageSourcePropType } from 'react-native';

const CLUB_LEFT_ARROWS: Record<string, ImageSourcePropType> = {
  club_akron: require('../clubs/carousel/arrows/arrow_left_club_akron.webp'),
  club_akhmat: require('../clubs/carousel/arrows/arrow_left_club_akhmat.webp'),
  club_baltika: require('../clubs/carousel/arrows/arrow_left_club_baltika.webp'),
  club_dinmah: require('../clubs/carousel/arrows/arrow_left_club_dinmah.webp'),
  club_dinmos: require('../clubs/carousel/arrows/arrow_left_club_dinmos.webp'),
  club_zenit: require('../clubs/carousel/arrows/arrow_left_club_zenit.webp'),
  club_krasnodar: require('../clubs/carousel/arrows/arrow_left_club_krasnodar.webp'),
  club_spartak: require('../clubs/carousel/arrows/arrow_left_club_spartak.webp'),
  club_cska: require('../clubs/carousel/arrows/arrow_left_club_cska.webp'),
  club_loko: require('../clubs/carousel/arrows/arrow_left_club_loko.webp'),
  club_rostov: require('../clubs/carousel/arrows/arrow_left_club_rostov.webp'),
  club_rubin: require('../clubs/carousel/arrows/arrow_left_club_rubin.webp'),
  club_ks: require('../clubs/carousel/arrows/arrow_left_club_ks.webp'),
  club_orenburg: require('../clubs/carousel/arrows/arrow_left_club_orenburg.webp'),
  club_fakel: require('../clubs/carousel/arrows/arrow_left_club_fakel.webp'),
  club_rodina: require('../clubs/carousel/arrows/arrow_left_club_rodina.webp'),
  stadium_rpl: require('../clubs/carousel/arrows/arrow_left_stadium_rpl.webp'),
  stadium_fnl: require('../clubs/carousel/arrows/arrow_left_stadium_fnl.webp'),
  stadium_pfl: require('../clubs/carousel/arrows/arrow_left_stadium_pfl.webp'),
  logo_rpl: require('../clubs/carousel/arrows/arrow_left_logo_rpl.webp'),
  logo_fnl: require('../clubs/carousel/arrows/arrow_left_logo_fnl.webp'),
  logo_fnl2: require('../clubs/carousel/arrows/arrow_left_logo_fnl2.webp'),
  logo_twolig: require('../clubs/carousel/arrows/arrow_left_logo_twolig.webp'),
  logo_media: require('../clubs/carousel/arrows/arrow_left_logo_media.webp'),
  logo_hidden: require('../clubs/carousel/arrows/arrow_left_logo_hidden.webp'),
};

const CLUB_RIGHT_ARROWS: Record<string, ImageSourcePropType> = {
  club_akron: require('../clubs/carousel/arrows/arrow_right_club_akron.webp'),
  club_akhmat: require('../clubs/carousel/arrows/arrow_right_club_akhmat.webp'),
  club_baltika: require('../clubs/carousel/arrows/arrow_right_club_baltika.webp'),
  club_dinmah: require('../clubs/carousel/arrows/arrow_right_club_dinmah.webp'),
  club_dinmos: require('../clubs/carousel/arrows/arrow_right_club_dinmos.webp'),
  club_zenit: require('../clubs/carousel/arrows/arrow_right_club_zenit.webp'),
  club_krasnodar: require('../clubs/carousel/arrows/arrow_right_club_krasnodar.webp'),
  club_spartak: require('../clubs/carousel/arrows/arrow_right_club_spartak.webp'),
  club_cska: require('../clubs/carousel/arrows/arrow_right_club_cska.webp'),
  club_loko: require('../clubs/carousel/arrows/arrow_right_club_loko.webp'),
  club_rostov: require('../clubs/carousel/arrows/arrow_right_club_rostov.webp'),
  club_rubin: require('../clubs/carousel/arrows/arrow_right_club_rubin.webp'),
  club_ks: require('../clubs/carousel/arrows/arrow_right_club_ks.webp'),
  club_orenburg: require('../clubs/carousel/arrows/arrow_right_club_orenburg.webp'),
  club_fakel: require('../clubs/carousel/arrows/arrow_right_club_fakel.webp'),
  club_rodina: require('../clubs/carousel/arrows/arrow_right_club_rodina.webp'),
  stadium_rpl: require('../clubs/carousel/arrows/arrow_right_stadium_rpl.webp'),
  stadium_fnl: require('../clubs/carousel/arrows/arrow_right_stadium_fnl.webp'),
  stadium_pfl: require('../clubs/carousel/arrows/arrow_right_stadium_pfl.webp'),
  logo_rpl: require('../clubs/carousel/arrows/arrow_right_logo_rpl.webp'),
  logo_fnl: require('../clubs/carousel/arrows/arrow_right_logo_fnl.webp'),
  logo_fnl2: require('../clubs/carousel/arrows/arrow_right_logo_fnl2.webp'),
  logo_twolig: require('../clubs/carousel/arrows/arrow_right_logo_twolig.webp'),
  logo_media: require('../clubs/carousel/arrows/arrow_right_logo_media.webp'),
  logo_hidden: require('../clubs/carousel/arrows/arrow_right_logo_hidden.webp'),
};

const DISABLED_ARROWS: Record<'left' | 'right', ImageSourcePropType> = {
  left: require('../clubs/carousel/arrows/arrow_left_disabled.webp'),
  right: require('../clubs/carousel/arrows/arrow_right_disabled.webp'),
};

const CLUB_HERO_COMPOSITES: Partial<Record<string, ImageSourcePropType>> = {
  club_akron: require('../clubs/carousel/heroes/club_akron_hero.webp'),
  club_akhmat: require('../clubs/carousel/heroes/club_akhmat_hero.webp'),
  club_baltika: require('../clubs/carousel/heroes/club_baltika_hero.webp'),
  club_cska: require('../clubs/carousel/heroes/club_cska_hero.webp'),
  club_dinmah: require('../clubs/carousel/heroes/club_dinmah_hero.webp'),
  club_dinmos: require('../clubs/carousel/heroes/club_dinmos_hero.webp'),
  club_fakel: require('../clubs/carousel/heroes/club_fakel_hero.webp'),
  club_krasnodar: require('../clubs/carousel/heroes/club_krasnodar_hero.webp'),
  club_ks: require('../clubs/carousel/heroes/club_ks_hero.webp'),
  club_loko: require('../clubs/carousel/heroes/club_loko_hero.webp'),
  club_orenburg: require('../clubs/carousel/heroes/club_orenburg_hero.webp'),
  club_rodina: require('../clubs/carousel/heroes/club_rodina_hero.webp'),
  club_rostov: require('../clubs/carousel/heroes/club_rostov_hero.webp'),
  club_rubin: require('../clubs/carousel/heroes/club_rubin_hero.webp'),
  club_spartak: require('../clubs/carousel/heroes/club_spartak_hero.webp'),
  club_zenit: require('../clubs/carousel/heroes/club_zenit_hero.webp'),
  stadium_rpl: require('../clubs/carousel/heroes/stadium_rpl_hero.webp'),
  stadium_fnl: require('../clubs/carousel/heroes/stadium_fnl_hero.webp'),
  stadium_pfl: require('../clubs/carousel/heroes/stadium_pfl_hero.webp'),
  logo_rpl: require('../clubs/carousel/heroes/logo_rpl_hero.webp'),
  logo_fnl: require('../clubs/carousel/heroes/logo_fnl_hero.webp'),
  logo_fnl2: require('../clubs/carousel/heroes/logo_fnl2_hero.webp'),
  logo_twolig: require('../clubs/carousel/heroes/logo_fnl2_hero.webp'),
  logo_media: require('../clubs/carousel/heroes/logo_media_hero.webp'),
  logo_hidden: require('../clubs/carousel/heroes/logo_hidden_hero.webp'),
};

export function getClubArrowSource(
  clubId: string,
  direction: 'left' | 'right',
): ImageSourcePropType {
  const sources = direction === 'left' ? CLUB_LEFT_ARROWS : CLUB_RIGHT_ARROWS;
  return sources[clubId] ?? sources.club_krasnodar;
}

export function getDisabledClubArrowSource(
  direction: 'left' | 'right',
): ImageSourcePropType {
  return DISABLED_ARROWS[direction];
}

export function getClubHeroCompositeSource(
  clubId: string,
): ImageSourcePropType | null {
  return CLUB_HERO_COMPOSITES[clubId] ?? null;
}
