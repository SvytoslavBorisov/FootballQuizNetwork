import type { ImageSourcePropType } from 'react-native';
import type { CategoryId } from '../../types/quiz';

const cardImages: Record<CategoryId, ImageSourcePropType> = {
  matchday: require('./categories/cards/matchday_card_new.webp'),
  cup: require('./categories/cards/cup_card_new.webp'),
  clubs: require('./categories/cards/clubs_card_new.webp'),
  stadiums: require('./categories/cards/stadiums_card_new.webp'),
  logos: require('./categories/cards/logos_card_new.webp'),
};

const heroImages: Record<CategoryId, ImageSourcePropType> = {
  matchday: require('./images/matchday.webp'),
  cup: require('./images/cup.webp'),
  clubs: require('./images/clubs.webp'),
  stadiums: require('./images/stadiums.webp'),
  logos: require('./images/clubs_alt.webp'),
};

export function getCategoryCardImage(categoryId: CategoryId): ImageSourcePropType {
  return cardImages[categoryId];
}

export function getCategoryHeroImage(categoryId: CategoryId): ImageSourcePropType {
  return heroImages[categoryId];
}
