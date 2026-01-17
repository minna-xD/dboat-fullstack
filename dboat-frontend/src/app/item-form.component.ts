import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Item, ItemType } from './models/item.model';

@Component({
  standalone: true,
  selector: 'app-item-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent implements OnChanges  {

  @Input() editingItem: Item | null = null;
  @Output() submitForm = new EventEmitter<Item>();
  @Output() cancel = new EventEmitter<void>();

  form = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true }),
    type: new FormControl<ItemType>(ItemType.GAME, { nonNullable: true })
  });

  itemTypes = Object.values(ItemType);

  ngOnChanges() {
    if (this.editingItem) {
      this.form.patchValue(this.editingItem);
    }
  }

  submit() {
    if (!this.form.value.title || !this.form.value.type) {
      return;
    }

    const item: Item = {
      title: this.form.value.title,
      type: this.form.value.type
    };

    this.submitForm.emit(item);
  }

  cancelEdit() {
    this.cancel.emit();
  }
}