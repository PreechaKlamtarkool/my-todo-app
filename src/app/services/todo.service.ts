import { HttpClient } from '@angular/common/http';
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
    return this.http.get<TodoItem[]>(this.base_url);
  }

  getTodoItemById(id: number): Observable<TodoItem> {
    return this.http.get<TodoItem>(`${this.base_url}/${id}`);
  }

  createNewTodoItem(todoItem: TodoItem): Observable<TodoItem> {
    return this.http.post<TodoItem>(this.base_url, todoItem);
  }

  updateTodoItem(id: number, todoItem: TodoItem): Observable<TodoItem> {
    return this.http.put<TodoItem>(`${this.base_url}/${id}`, todoItem);
  }

  deleteTodoItem(id: number): Observable<any> {
    return this.http.delete(`${this.base_url}/${id}`);
  }
}
