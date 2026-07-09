import { ImageSourcePropType } from 'react-native';
import { CategoryId } from '../../types/quiz';

const cardImages: Record<CategoryId, ImageSourcePropType> = {
  matchday: require('./cards/matchday_card_new.png'),
  cup: require('./cards/cup_card_new.png'),
  clubs: require('./cards/clubs_card_new.png'),
  stadiums: require('./cards/stadiums_card_new.png'),
  logos: require('./cards/logos_card_new.png'),
};

export function getCategoryCardImage(categoryId: CategoryId): ImageSourcePropType {
  return cardImages[categoryId];
}
