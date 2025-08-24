import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogueSystemComponent } from '../dialogue-system/dialogue-system.component';
import { WorldMapComponent } from '../world-map/world-map.component';
import { LexiconSidebarComponent } from '../lexicon-sidebar/lexicon-sidebar.component';
import { MemoryDiveComponent } from '../memory-dive/memory-dive.component';
import { GameService } from '../../services/game.service';
import { prologueChapter, languageSelectionScene, hubScene } from '../../data/dialogue';

type GameScreen = 'prologue' | 'language_selection' | 'hub' | 'map' | 'lexicon' | 'memory_dive';

@Component({
  selector: 'app-game',
  imports: [
    CommonModule,
    DialogueSystemComponent,
    WorldMapComponent,
    LexiconSidebarComponent,
    MemoryDiveComponent
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameComponent implements OnInit {
  currentScreen: GameScreen = 'prologue';
  currentSceneId = 'prologue_start';

  constructor(private gameService: GameService) {}

  ngOnInit() {
    // Initialize game state if needed
  }

  handleSceneComplete() {
    if (this.currentScreen === 'prologue') {
      this.currentScreen = 'language_selection';
      this.currentSceneId = 'language_selection';
    } else if (this.currentScreen === 'language_selection') {
      this.currentScreen = 'hub';
      this.currentSceneId = 'hub_main';
    }
  }

  onSceneChange(sceneId: string) {
    this.currentSceneId = sceneId;
  }

  returnToHub() {
    this.currentScreen = 'hub';
    this.currentSceneId = 'hub_main';
  }

  navigateToScreen(screen: GameScreen) {
    this.currentScreen = screen;
  }

  get prologueChapter() {
    return prologueChapter;
  }

  get languageSelectionScene() {
    return languageSelectionScene;
  }

  get hubScene() {
    return hubScene;
  }
}