import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ItemListComponent } from './item-list.component';
import { ItemFormComponent } from './item-form.component';
import { ItemService } from './services/item.service';
import { Item } from './models/item.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ItemFormComponent, ItemListComponent],
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