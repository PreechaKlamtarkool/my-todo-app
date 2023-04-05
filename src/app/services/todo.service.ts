import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TodoItem } from '../models/todo-item';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  base_url = 'http://localhost:8080/api/todos'  

  constructor(private http: HttpClient) { }

  getAllTodoItems(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(this.base_url, { headers: this.getHeader() });
  }

  getTodoItemById(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.base_url}/${id}`, { headers: this.getHeader() });
  }

  createNewTodoItem(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.base_url, todoItem, { headers: this.getHeader() });
  }

  updateTodoItem(id: number, todoItem: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.base_url}/${id}`, todoItem, { headers: this.getHeader() });
  }

  deleteTodoItem(id: number): Observable<any> {
    return this.http.delete(`${this.base_url}/${id}`, { headers: this.getHeader() });
  }

  private getHeader(): HttpHeaders {
    let headers= new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwcmVlY2hhLmtAYWJjLmNvbSIsImlhdCI6MTY4MDUyOTU4NSwiZXhwIjoxNjgwNTMxMDI1fQ.FlfF3OQkzstvZK3Zul9r82BWRUXFDgAW0EAK_EE1Iww')
    return headers;
  }
}
