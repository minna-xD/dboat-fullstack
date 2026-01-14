import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ItemService } from './services/item.service';
import { Item } from './models/item';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  items: Item[] = [];
  constructor(private itemService: ItemService) {}

  ngOnInit() {
    this.itemService.getItems().subscribe(data => {
      this.items = data;
    });
  }
}
