import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Item } from './models/item.model';
import { ItemService } from './services/item.service';

@Component({
  standalone: true,
  selector: 'app-item-list',
  imports: [CommonModule],
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit {

  items$!: Observable<Item[]>;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.items$ = this.itemService.getItems();
  }

  deleteItem(id: number): void {
    if (!confirm('Delete this item?')) return;

    this.itemService.deleteItem(id).subscribe(() => {
      this.loadItems(); // refresh list
    });
  }
}