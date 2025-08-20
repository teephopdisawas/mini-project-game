import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { GameState, Memory } from '../../types/game';

@Component({
  selector: 'app-lexicon-sidebar',
  imports: [CommonModule],
  templateUrl: './lexicon-sidebar.component.html',
  styleUrl: './lexicon-sidebar.component.css'
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

  onClose() {
    this.close.emit();
  }
}