import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { GameState, Memory } from '../../types/game';

@Component({
  selector: 'app-lexicon-sidebar',
  imports: [CommonModule],
  templateUrl: './lexicon-sidebar.component.html',
  styleUrl: './lexicon-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LexiconSidebarComponent {
  @Output() close = new EventEmitter<void>();

  gameState$: Observable<GameState>;
  Object = Object; // Expose Object to template

  constructor(private gameService: GameService) {
    this.gameState$ = this.gameService.state$;
  }

  getUnlockedMemories(memories: Record<string, Memory>): Memory[] {
    return Object.values(memories).filter(memory => !memory.locked);
  }

  getLockedMemories(memories: Record<string, Memory>): Memory[] {
    return Object.values(memories).filter(memory => memory.locked);
  }

  trackByMemoryId(index: number, memory: Memory): string {
    return memory.id;
  }

  trackByLanguage(index: number, lang: string): string {
    return lang;
  }

  trackByFactionKey(index: number, key: string): string {
    return key;
  }

  onClose() {
    this.close.emit();
  }
}