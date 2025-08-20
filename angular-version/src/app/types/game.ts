export interface GameState {
  playerName: string;
  knownLanguages: string[];
  languageFlags: Record<string, boolean>;
  memories: Record<string, Memory>;
  consequenceMap: Record<string, string[]>;
  factionInfluence: Record<string, number>;
  currentScene: string;
  completedScenes: string[];
}

export interface Memory {
  id: string;
  title: string;
  locked: boolean;
  content: string;
  unlockConditions?: string[];
}

export interface Region {
  id: string;
  name: string;
  faction: string;
  x: number;
  y: number;
  w: number;
  h: number;
  influence: number;
  description: string;
}

export interface FactionMapData {
  map_image: string;
  regions: Region[];
}

export interface DialogueChoice {
  id: string;
  text: string;
  glyphUsed?: string;
  consequences?: string[];
  requiresLanguages?: string[];
  unlocks?: string[];
}

export interface DialogueNode {
  id: string;
  speaker: string;
  text: string;
  choices?: DialogueChoice[];
  autoAdvance?: string;
  effects?: {
    memories?: string[];
    languages?: string[];
    factionChanges?: Record<string, number>;
  };
}

export interface Chapter {
  id: string;
  title: string;
  scenes: DialogueNode[];
  unlockConditions?: string[];
}

export type GameAction = 
  | { type: 'SET_PLAYER_NAME'; payload: string }
  | { type: 'LEARN_LANGUAGE'; payload: string }
  | { type: 'UNLOCK_MEMORY'; payload: string }
  | { type: 'ADD_CONSEQUENCE'; payload: { key: string; value: string } }
  | { type: 'UPDATE_FACTION_INFLUENCE'; payload: { faction: string; change: number } }
  | { type: 'SET_CURRENT_SCENE'; payload: string }
  | { type: 'COMPLETE_SCENE'; payload: string };