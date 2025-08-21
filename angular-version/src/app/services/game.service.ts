import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GameState, GameAction, Memory } from '../types/game';

const initialMemories: Record<string, Memory> = {
  m_intro: {
    id: 'm_intro',
    title: 'Flicker',
    locked: true,
    content: 'A half-remembered taste of salt and smoke.'
  },
  m_childhood: {
    id: 'm_childhood', 
    title: 'Childhood Song',
    locked: true,
    content: 'A lullaby about falling stars.'
  }
};

const initialState: GameState = {
  playerName: 'Traveler',
  knownLanguages: ['common'],
  languageFlags: { english: false, dutch: false, latin: false, greek: false },
  memories: initialMemories,
  consequenceMap: {},
  factionInfluence: { ravengard: 60, whispering_woods: 50, fringe_ruins: 30 },
  currentScene: 'start',
  completedScenes: []
};

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private stateSubject = new BehaviorSubject<GameState>(initialState);
  
  get state$(): Observable<GameState> {
    return this.stateSubject.asObservable();
  }
  
  get state(): GameState {
    return this.stateSubject.value;
  }

  dispatch(action: GameAction): void {
    const currentState = this.stateSubject.value;
    const newState = this.gameReducer(currentState, action);
    this.stateSubject.next(newState);
  }

  private gameReducer(state: GameState, action: GameAction): GameState {
    switch (action.type) {
      case 'SET_PLAYER_NAME':
        return { ...state, playerName: action.payload };
        
      case 'LEARN_LANGUAGE': {
        const lang = action.payload.toLowerCase();
        return {
          ...state,
          knownLanguages: state.knownLanguages.includes(lang) 
            ? state.knownLanguages 
            : [...state.knownLanguages, lang],
          languageFlags: { ...state.languageFlags, [lang]: true }
        };
      }
      
      case 'UNLOCK_MEMORY':
        return {
          ...state,
          memories: {
            ...state.memories,
            [action.payload]: {
              ...state.memories[action.payload],
              locked: false
            }
          }
        };
        
      case 'ADD_CONSEQUENCE':
        return {
          ...state,
          consequenceMap: {
            ...state.consequenceMap,
            [action.payload.key]: [
              ...(state.consequenceMap[action.payload.key] || []),
              action.payload.value
            ]
          }
        };
        
      case 'UPDATE_FACTION_INFLUENCE':
        return {
          ...state,
          factionInfluence: {
            ...state.factionInfluence,
            [action.payload.faction]: 
              (state.factionInfluence[action.payload.faction] || 0) + action.payload.change
          }
        };
        
      case 'SET_CURRENT_SCENE':
        return { ...state, currentScene: action.payload };
        
      case 'COMPLETE_SCENE':
        return {
          ...state,
          completedScenes: state.completedScenes.includes(action.payload)
            ? state.completedScenes
            : [...state.completedScenes, action.payload]
        };
        
      default:
        return state;
    }
  }
}