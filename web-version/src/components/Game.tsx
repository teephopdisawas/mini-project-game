import { useState } from 'react';
import { GameProvider, useGame } from '../context/GameContext';
import DialogueSystem from '../components/DialogueSystem';
import WorldMap from '../components/WorldMap';
import LexiconSidebar from '../components/LexiconSidebar';
import MemoryDive from '../components/MemoryDive';
import { prologueChapter, languageSelectionScene, hubScene } from '../data/dialogue';

type GameScreen = 'prologue' | 'language_selection' | 'hub' | 'map' | 'lexicon' | 'memory_dive';

function GameContent() {
  const { state } = useGame();
  const [currentScreen, setCurrentScreen] = useState<GameScreen>('prologue');
  const [currentSceneId, setCurrentSceneId] = useState('prologue_start');

  const handleSceneComplete = () => {
    if (currentScreen === 'prologue') {
      setCurrentScreen('language_selection');
      setCurrentSceneId('language_selection');
    } else if (currentScreen === 'language_selection') {
      setCurrentScreen('hub');
      setCurrentSceneId('hub_main');
    }
  };

  // Removed unused handleHubChoice function since navigation is handled by buttons

  const returnToHub = () => {
    setCurrentScreen('hub');
    setCurrentSceneId('hub_main');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'prologue':
        return (
          <DialogueSystem
            scenes={prologueChapter}
            currentSceneId={currentSceneId}
            onSceneChange={setCurrentSceneId}
            onComplete={handleSceneComplete}
          />
        );
        
      case 'language_selection':
        return (
          <DialogueSystem
            scenes={languageSelectionScene}
            currentSceneId={currentSceneId}
            onSceneChange={setCurrentSceneId}
            onComplete={handleSceneComplete}
          />
        );
        
      case 'hub':
        return (
          <div className="hub-screen">
            <div className="hub-header">
              <h1>Echoes of Ellidra</h1>
              <div className="player-info">
                Welcome, <strong>{state.playerName}</strong>
              </div>
            </div>
            
            <DialogueSystem
              scenes={hubScene}
              currentSceneId={currentSceneId}
              onSceneChange={setCurrentSceneId}
              onComplete={() => {
                // Hub navigation handled by buttons below
              }}
            />
            
            <div className="hub-actions">
              <button onClick={() => setCurrentScreen('map')}>🗺️ Open Map</button>
              <button onClick={() => setCurrentScreen('lexicon')}>📚 Open Lexicon</button>
              <button onClick={() => setCurrentScreen('memory_dive')}>🧠 Memory-Dive</button>
            </div>
          </div>
        );
        
      case 'map':
        return <WorldMap onClose={returnToHub} />;
        
      case 'lexicon':
        return <LexiconSidebar onClose={returnToHub} />;
        
      case 'memory_dive':
        return <MemoryDive onClose={returnToHub} />;
        
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="game-container">
      {renderScreen()}
    </div>
  );
}

export default function Game() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}
