import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ItemService } from './services/item.service';

@Component({
  standalone: true,
  selector: 'app-item-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './item-form.component.html'
})
export class ItemFormComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      title: ['', Validators.required],
      type: ['GAME', Validators.required],
      completionDate: [''],
      notes: [''],
      author: ['']
    });
  }

  submit(): void {
    if (this.form.invalid) return;

    this.itemService.addItem(this.form.value as any).subscribe(() => {
      this.form.reset({ type: 'GAME' });
    });
  }
}