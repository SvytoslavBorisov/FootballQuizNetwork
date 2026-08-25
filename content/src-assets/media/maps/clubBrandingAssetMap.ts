import type { ImageSourcePropType } from 'react-native';

const hiddenPackIcon: ImageSourcePropType = require('../clubs/branding/icons/club_dissappeared.webp');

export const CLUB_BADGE_IMAGES: Record<string, ImageSourcePropType> = {
  club_akron: require('../clubs/branding/badges/club_akron_carusel.webp'),
  club_akhmat: require('../clubs/branding/badges/club_akhmat_carusel.webp'),
  club_baltika: require('../clubs/branding/badges/club_baltika_carusel.webp'),
  club_cska: require('../clubs/branding/badges/club_cska_carusel.webp'),
  club_dinmah: require('../clubs/branding/badges/club_dinmah.webp'),
  club_dinmos: require('../clubs/branding/badges/club_dinmos.webp'),
  club_zenit: require('../clubs/branding/badges/club_zenit.webp'),
  club_krasnodar: require('../clubs/branding/badges/club_krasnodar.webp'),
  club_ks: require('../clubs/branding/badges/club_ks.webp'),
  club_loko: require('../clubs/branding/badges/club_loko.webp'),
  club_orenburg: require('../clubs/branding/badges/club_orenburg.webp'),
  club_rodina: require('../clubs/branding/badges/club_rodina.webp'),
  club_rostov: require('../clubs/branding/badges/club_rostov.webp'),
  club_rubin: require('../clubs/branding/badges/club_rubin.webp'),
  club_spartak: require('../clubs/branding/badges/club_spartak.webp'),
  club_fakel: require('../clubs/branding/badges/club_fakel.webp'),
  league_rpl: require('../clubs/branding/badges/league_rpl.webp'),
  league_fnl: require('../clubs/branding/badges/league_fnl.webp'),
  league_fnl2: require('../clubs/branding/badges/league_fnl2.webp'),
  league_media: require('../clubs/branding/badges/league_media.webp'),
};

export const CLUB_CAROUSEL_ICON_IMAGES: Record<string, ImageSourcePropType> = {
  club_akron: CLUB_BADGE_IMAGES.club_akron,
  club_akhmat: CLUB_BADGE_IMAGES.club_akhmat,
  club_baltika: CLUB_BADGE_IMAGES.club_baltika,
  league_rpl: require('../clubs/branding/icons/icon_league_rpl.webp'),
  league_fnl: require('../clubs/branding/icons/icon_league_fnl.webp'),
  league_fnl2: require('../clubs/branding/icons/icon_league_fnl2.webp'),
  league_media: require('../clubs/branding/icons/icon_league_media.webp'),
  logo_hidden: hiddenPackIcon,
};

export const CLUB_UI_ICON_IMAGES: Record<string, ImageSourcePropType> = {
  club_akron: require('../clubs/branding/icons/icon_akron.webp'),
  club_akhmat: require('../clubs/branding/icons/icon_akhmat.webp'),
  club_baltika: require('../clubs/branding/icons/icon_baltika.webp'),
  club_dinmah: require('../clubs/branding/icons/icon_dinamo_mah.webp'),
  club_dinmos: require('../clubs/branding/icons/icon_dinamo.webp'),
  club_zenit: require('../clubs/branding/icons/icon_zenit.webp'),
  club_krasnodar: require('../clubs/branding/icons/icon_krasnodar.webp'),
  club_ks: require('../clubs/branding/icons/icon_ks.webp'),
  club_loko: require('../clubs/branding/icons/icon_lokomotiv.webp'),
  club_orenburg: require('../clubs/branding/icons/icon_orenburg.webp'),
  club_rodina: require('../clubs/branding/icons/icon_rodina.webp'),
  club_rostov: require('../clubs/branding/icons/icon_rostov.webp'),
  club_rubin: require('../clubs/branding/icons/icon_rubin.webp'),
  club_spartak: require('../clubs/branding/icons/icon_spartak.webp'),
  club_fakel: require('../clubs/branding/icons/icon_fakel.webp'),
  club_cska: require('../clubs/branding/icons/icon_cska.webp'),
  league_rpl: CLUB_CAROUSEL_ICON_IMAGES.league_rpl,
  league_fnl: CLUB_CAROUSEL_ICON_IMAGES.league_fnl,
  league_fnl2: CLUB_CAROUSEL_ICON_IMAGES.league_fnl2,
  league_media: CLUB_CAROUSEL_ICON_IMAGES.league_media,
  logo_hidden: hiddenPackIcon,
};
