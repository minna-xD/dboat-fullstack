import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Item } from './models/item.model';
import { ItemService } from './services/item.service';
import { ItemFormComponent } from './item-form.component';
import { ItemListComponent } from './item-list.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ItemFormComponent, ItemListComponent, RouterOutlet],
  templateUrl: './app.html'
})
export class App implements OnInit {
  items$: Observable<Item[]>;
  editingItem: Item | null = null;
  errorMessage = "";

  constructor(private itemService: ItemService) {
    this.items$ = this.itemService.items$;
  }

  ngOnInit() {
    console.log('Environment:', environment.envName);
  }

  refreshItems() {
    this.items$ = this.itemService.getItems();
  }

  onEditItem(item: Item) {
    this.editingItem = item;
  }

  onFormSubmit(updated: Item) {
    const action$ = this.editingItem
    ? this.itemService.updateItem(this.editingItem.id!, { ...this.editingItem, ...updated })
    : this.itemService.addItem(updated);

    action$.subscribe(() => {
      this.editingItem = null;
    });
  }

  cancelEdit() {
    this.editingItem = null;
  }

  onDeleteItem(id: number) {
    this.itemService.deleteItem(id).subscribe();
  }

  getErrorMessage() {
    this.errorMessage = this.itemService.getErrorMessage();
  }
}