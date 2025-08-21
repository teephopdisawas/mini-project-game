import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FactionMapData, Region } from '../../types/game';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-world-map',
  imports: [CommonModule],
  templateUrl: './world-map.component.html',
  styleUrl: './world-map.component.css'
})
export class WorldMapComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  
  mapData: FactionMapData | null = null;
  selectedRegion: Region | null = null;

  constructor(
    private gameService: GameService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http.get<FactionMapData>('/data/faction_map.json').subscribe({
      next: (data) => this.mapData = data,
      error: (err) => console.error('Failed to load map data:', err)
    });
  }

  handleRegionClick(region: Region) {
    this.selectedRegion = region;
    this.gameService.dispatch({ 
      type: 'ADD_CONSEQUENCE', 
      payload: { key: region.id, value: 'inspected' } 
    });
  }

  closeRegionInfo() {
    this.selectedRegion = null;
  }

  investigateRegion(region: Region) {
    this.gameService.dispatch({ 
      type: 'ADD_CONSEQUENCE', 
      payload: { key: region.id, value: 'investigated' } 
    });
    this.closeRegionInfo();
  }

  onClose() {
    this.close.emit();
  }
}