import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Item } from '../models/item.model';
import { environment } from '../../environments/environment';
//fetch(environment.apiUrl);

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  //private readonly apiUrl = 'http://localhost:8080/api/items';
  private readonly apiUrl = environment.apiUrl;
  errorMessage: string = "";

  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.refreshItems();
  }

  // refreshItems() {
  //   this.http.get<Item[]>(this.apiUrl).subscribe(items => this.itemsSubject.next(items));
  // }

  refreshItems() {
    this.http.get<Item[]>(this.apiUrl).subscribe({
      next: items => {
        this.itemsSubject.next(items);
        this.errorMessage = "";  // clear previous error if successful
      },
      error: err => {
        console.error('Failed to load items:', err);
        this.errorMessage = 'Backend is starting or unavailable. Try again in a few seconds.';
        // Optionally, you can push an empty array to the subject to clear the list
        //this.itemsSubject.next([]);
      }
    });
  }

  getErrorMessage() {
    return this.errorMessage;
  }

  getItems(): Observable<Item[]> {
    return this.items$;
  }

  addItem(item: Item): Observable<Item> {
    return this.http.post<Item>(this.apiUrl, item).pipe(
      tap(() => this.refreshItems())
    );
  }

  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.apiUrl}/${id}`, item).pipe(
      tap(() => this.refreshItems())
    );
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.refreshItems())
    );
  }
}