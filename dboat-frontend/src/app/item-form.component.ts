import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Item, ItemType } from './models/item.model';

@Component({
  standalone: true,
  selector: 'app-item-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent implements OnInit, OnChanges  {

  @Input() editingItem: Item | null = null;
  @Output() submitForm = new EventEmitter<Item>();
  @Output() cancel = new EventEmitter<void>();

  private todayISO(): string {
    return new Date().toISOString().slice(0, 10);
  }

  itemForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable: true }),
    type: new FormControl<ItemType>(ItemType.GAME, { nonNullable: true }),
    completionDate: new FormControl<string>(this.todayISO()),
    notes: new FormControl<string>(''),
    author: new FormControl<string>({value: '', disabled: true })
  });

  itemTypes = Object.values(ItemType);

  ngOnInit() {
    const typeControl = this.itemForm.get('type');
    const authorControl = this.itemForm.get('author');
    const dateControl = this.itemForm.get('completionDate');

    typeControl?.valueChanges.subscribe(type => {
      if (type === 'BOOK') {
        authorControl?.enable();
      } else {
        authorControl?.disable();
        authorControl?.setValue('');
      }
    });
  }

  ngOnChanges() {
    if (this.editingItem) {
      this.itemForm.patchValue(this.editingItem);
    }
  }

  submit() {
    if (!this.itemForm.value.title || !this.itemForm.value.type) {
      return;
    }

    const item: Item = {
      title: this.itemForm.value.title,
      type: this.itemForm.value.type,
      author: this.itemForm.value.author ?? undefined,
      completionDate: this.itemForm.value.completionDate ?? undefined,
      notes: this.itemForm.value.notes ?? undefined
    };

    this.submitForm.emit(item);

    this.itemForm.reset({
      title: '',
      type: ItemType.GAME,
      completionDate: this.todayISO(),
      author: null
    });
  }

  cancelEdit() {
    this.cancel.emit();
    this.itemForm.reset({
      title: '',
      type: ItemType.GAME,
      completionDate: this.todayISO(),
      author: null
    });
  }
}