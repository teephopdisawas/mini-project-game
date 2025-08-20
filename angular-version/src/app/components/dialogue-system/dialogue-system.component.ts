import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogueNode, DialogueChoice } from '../../types/game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-dialogue-system',
  imports: [CommonModule, FormsModule],
  templateUrl: './dialogue-system.component.html',
  styleUrl: './dialogue-system.component.css'
})
export class DialogueSystemComponent implements OnInit, OnChanges {
  @Input() scenes: DialogueNode[] = [];
  @Input() currentSceneId: string = '';
  @Output() sceneChange = new EventEmitter<string>();
  @Output() complete = new EventEmitter<void>();

  currentScene: DialogueNode | null = null;
  showNameInput = false;
  nameInput = '';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.updateCurrentScene();
  }

  ngOnChanges() {
    this.updateCurrentScene();
  }

  private updateCurrentScene() {
    this.currentScene = this.scenes.find(scene => scene.id === this.currentSceneId) || null;
    this.showNameInput = this.currentScene?.choices?.some(choice => choice.id === 'choose_name') || false;
    
    // Handle auto-advance - but only if no choices are present
    if (this.currentScene?.autoAdvance && !this.currentScene.choices) {
      setTimeout(() => {
        this.sceneChange.emit(this.currentScene!.autoAdvance!);
      }, 3000); // Wait 3 seconds before auto-advancing
    }
  }

  handleChoice(choice: DialogueChoice) {
    if (choice.id === 'choose_name') {
      this.showNameInput = true;
      return;
    }

    // Apply consequences
    choice.consequences?.forEach(consequence => {
      this.gameService.dispatch({ type: 'ADD_CONSEQUENCE', payload: { key: 'player_choices', value: consequence } });
    });

    // Unlock memories
    choice.unlocks?.forEach(unlock => {
      this.gameService.dispatch({ type: 'UNLOCK_MEMORY', payload: unlock });
    });

    // Learn languages
    if (choice.id.startsWith('choose_')) {
      const lang = choice.id.replace('choose_', '');
      this.gameService.dispatch({ type: 'LEARN_LANGUAGE', payload: lang });
    }

    // Apply glyph effects
    if (choice.glyphUsed) {
      this.gameService.dispatch({ type: 'ADD_CONSEQUENCE', payload: { 
        key: 'glyphs_used', 
        value: choice.glyphUsed 
      } });
    }

    // Handle navigation
    if (choice.id === 'who_are_you') {
      this.sceneChange.emit('figure_response_identity');
    } else if (choice.id === 'return_from_where') {
      this.sceneChange.emit('figure_response_memory');
    } else if (choice.id === 'use_glyph') {
      this.sceneChange.emit('figure_response_glyph');
    } else if (choice.id.startsWith('choose_') && choice.id !== 'choose_name') {
      this.complete.emit();
    } else {
      // Check for auto-advance
      if (this.currentScene?.autoAdvance) {
        this.sceneChange.emit(this.currentScene.autoAdvance);
      }
    }
  }

  handleNameSubmit() {
    if (this.nameInput.trim()) {
      this.gameService.dispatch({ type: 'SET_PLAYER_NAME', payload: this.nameInput.trim() });
      this.showNameInput = false;
      this.complete.emit();
    }
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.handleNameSubmit();
    }
  }

  isChoiceAvailable(choice: DialogueChoice): boolean {
    if (!choice.requiresLanguages) return true;
    
    const state = this.gameService.state;
    return choice.requiresLanguages.every(lang => 
      state.knownLanguages.includes(lang)
    );
  }
}