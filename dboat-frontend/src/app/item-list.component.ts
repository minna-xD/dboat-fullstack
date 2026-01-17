import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from './models/item.model';

@Component({
  standalone: true,
  selector: 'app-item-list',
  imports: [CommonModule],
  templateUrl: './item-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemListComponent {

  @Input() items: Item[] | null = null;
  @Output() edit = new EventEmitter<Item>();
  @Output() delete = new EventEmitter<number>();

  onEdit(item: Item) {
    this.edit.emit(item);
  }

  onDelete(id?: number) {
    if (id == null) return;
    this.delete.emit(id);
  }

  trackById(_: number, item: Item) {
    return item.id;
  }
}