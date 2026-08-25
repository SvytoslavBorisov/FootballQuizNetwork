import type { ImageSourcePropType } from 'react-native';
import type { CategoryId } from '../../../types/quiz';

const cardImages: Record<CategoryId, ImageSourcePropType> = {
  matchday: require('../categories/cards/matchday_card_new.webp'),
  cup: require('../categories/cards/cup_card_new.webp'),
  clubs: require('../categories/cards/clubs_card_new.webp'),
  stadiums: require('../categories/cards/stadiums_card_new.webp'),
  logos: require('../categories/cards/logos_card_new.webp'),
};

const heroImages: Record<CategoryId, ImageSourcePropType> = {
  matchday: require('../categories/heroes/matchday.webp'),
  cup: require('../categories/heroes/cup.webp'),
  clubs: require('../categories/heroes/clubs.webp'),
  stadiums: require('../categories/heroes/stadiums.webp'),
  logos: require('../categories/heroes/clubs_alt.webp'),
};

export function getCategoryCardImage(
  categoryId: CategoryId,
): ImageSourcePropType {
  return cardImages[categoryId];
}

export function getCategoryHeroImage(
  categoryId: CategoryId,
): ImageSourcePropType {
  return heroImages[categoryId];
}
