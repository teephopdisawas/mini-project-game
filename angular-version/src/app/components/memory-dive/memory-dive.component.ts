import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { GameState, Memory } from '../../types/game';

@Component({
  selector: 'app-memory-dive',
  imports: [CommonModule],
  templateUrl: './memory-dive.component.html',
  styleUrl: './memory-dive.component.css'
})
export class MemoryDiveComponent {
  @Output() close = new EventEmitter<void>();

  gameState$: Observable<GameState>;
  Object = Object; // Expose Object to template

  constructor(private gameService: GameService) {
    this.gameState$ = this.gameService.state$;
  }

  handleMemoryInteraction(memoryId: string) {
    const state = this.gameService.state;
    const memory = state.memories[memoryId];
    
    if (memory && !memory.locked) {
      this.gameService.dispatch({
        type: 'ADD_CONSEQUENCE',
        payload: { key: 'memory_interactions', value: memoryId }
      });
    }
  }

  handleGlyphTranslation() {
    const state = this.gameService.state;
    
    if (state.knownLanguages.length > 1) {
      // Success case - try to unlock a random locked memory
      const lockedMemories = Object.values(state.memories).filter(m => m.locked);
      if (lockedMemories.length > 0) {
        const randomMemory = lockedMemories[Math.floor(Math.random() * lockedMemories.length)];
        this.gameService.dispatch({
          type: 'UNLOCK_MEMORY',
          payload: randomMemory.id
        });
        
        this.gameService.dispatch({
          type: 'ADD_CONSEQUENCE',
          payload: { key: 'glyph_translations', value: 'success' }
        });
      }
    } else {
      this.gameService.dispatch({
        type: 'ADD_CONSEQUENCE',
        payload: { key: 'glyph_translations', value: 'failed' }
      });
    }
  }

  getMemories(memories: Record<string, Memory>): Memory[] {
    return Object.values(memories);
  }

  onClose() {
    this.close.emit();
  }
}