import { useState, useEffect } from 'react';
import type { FactionMapData, Region } from '../types/game';
import { useGame } from '../context/GameContext';

interface WorldMapProps {
  onClose: () => void;
}

export default function WorldMap({ onClose }: WorldMapProps) {
  const { state, dispatch } = useGame();
  const [mapData, setMapData] = useState<FactionMapData | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);

  useEffect(() => {
    fetch('/data/faction_map.json')
      .then(res => res.json())
      .then(data => setMapData(data))
      .catch(err => console.error('Failed to load map data:', err));
  }, []);

  const handleRegionClick = (region: Region) => {
    setSelectedRegion(region);
    dispatch({ type: 'ADD_CONSEQUENCE', payload: { key: region.id, value: 'inspected' } });
  };

  const closeRegionInfo = () => {
    setSelectedRegion(null);
  };

  if (!mapData) {
    return (
      <div className="map-container">
        <div className="map-loading">Loading map...</div>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="map-container">
      <div className="map-header">
        <h2>Map of Valdaren</h2>
        <button onClick={onClose} className="close-btn">×</button>
      </div>
      
      <div className="map-content">
        <div className="map-image-container">
          <img 
            src={mapData.map_image} 
            alt="Map of Valdaren"
            className="map-image"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/assets/placeholder-map.png';
            }}
          />
          
          {mapData.regions.map((region) => (
            <button
              key={region.id}
              className="region-hotspot"
              style={{
                left: `${region.x}px`,
                top: `${region.y}px`,
                width: `${region.w}px`,
                height: `${region.h}px`,
              }}
              onClick={() => handleRegionClick(region)}
              title={region.name}
            />
          ))}
        </div>

        <div className="faction-influence">
          <h3>Faction Influence</h3>
          {Object.entries(state.factionInfluence).map(([faction, influence]) => (
            <div key={faction} className="influence-bar">
              <span className="faction-name">{faction.replace('_', ' ')}</span>
              <div className="bar">
                <div 
                  className="bar-fill" 
                  style={{ width: `${influence}%` }}
                />
              </div>
              <span className="influence-value">{influence}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedRegion && (
        <div className="region-modal">
          <div className="modal-content">
            <h3>{selectedRegion.name}</h3>
            <p><strong>Faction:</strong> {selectedRegion.faction}</p>
            <p><strong>Influence:</strong> {selectedRegion.influence}</p>
            <p>{selectedRegion.description}</p>
            
            <div className="modal-actions">
              <button onClick={closeRegionInfo}>Acknowledge</button>
              <button onClick={() => {
                dispatch({ type: 'ADD_CONSEQUENCE', payload: { key: selectedRegion.id, value: 'investigated' } });
                closeRegionInfo();
              }}>
                Inspect Further
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
