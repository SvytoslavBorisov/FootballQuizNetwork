export interface CupLevelsBundle {
  levels?: Array<{ items?: unknown[] }>;
}

export const CUP_LEVELS_BUNDLE =
  require('./cup-levels.json') as CupLevelsBundle;
