export const activityList: Activity[] = ['grounding', 'breathing', 'video', 'interactive', 'creative', 'pmr']
export const breathingTypes: BreatingType[] = ['box', '478']
export const interactiveTypes: InteractiveType[] = ['sand', 'lines']
export const creativeTypes: string[] = ['knitting', 'coloring', 'claySculpting', 'plantCare', 'paperAirplanes', 'drawing', 'embroidery', 'origami', 'herbPlanting', 'watercolor', 'collage', 'cooking', 'sorting', 'braceletWeaving', 'paperMosaic', 'baking', 'woodwork', 'crochet', 'scrapbooking', 'botanicalSketch', 'snowflakes', 'dotDrawing', 'upcycling', 'newspaperWeaving', 'stoneDecorating', 'candles', 'marbling', 'restoration', 'fingerKnitting', 'doodling']

export const creativeImagesMap: Record<(typeof creativeTypes)[number], string> = {
  knitting: 'knitting',
  coloring: 'drawing',
  claySculpting: 'table',
  plantCare: 'plants',
  paperAirplanes: 'table',
  drawing: 'drawing',
  embroidery: 'knitting',
  origami: 'table',
  herbPlanting: 'plants',
  watercolor: 'drawing',
  cooking: 'cooking',
  baking: 'cooking',
  collage: 'table',
  paperMosaic: 'table',
  woodwork: 'table',
  braceletWeaving: 'knitting',
  sorting: 'table',
  scrapbooking: 'table',
  snowflakes: 'table',
  crochet: 'knitting',
  botanicalSketch: 'drawing',
  upcycling: 'table',
  candles: 'table',
  restoration: 'table',
  dotDrawing: 'drawing',
  newspaperWeaving: 'knitting',
  stoneDecorating: 'drawing',
  marbling: 'drawing',
  fingerKnitting: 'knitting',
  doodling: 'drawing',
}

export const primary100 = 'oklch(0.18 0.02 284.69)'
