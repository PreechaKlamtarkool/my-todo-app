import { Component, OnInit } from '@angular/core';
import { TodoItem } from '../models/todo-item';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{ 

  todoItems: TodoItem[] = [];

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.getAllTodoItems();
  }

  getAllTodoItems() {
    this.todoService.getAllTodoItems().subscribe(
      data => {
        this.todoItems = data;
      },
      error => {
        console.log(error);
      }
    )
  }
  
  createNewTodoItem(todoItem: TodoItem) {
    this.todoService.createNewTodoItem(todoItem).subscribe(
      res => {
        this.todoItems.push(res)
      },
      error => {
        console.log(error)
      }
    )
  }

  updateTodoItem(todoItem: TodoItem) {
    if(todoItem.id) {
      this.todoService.updateTodoItem(todoItem.id, todoItem).subscribe(
        res => {
          const index = this.todoItems.findIndex(item => item.id === todoItem.id);
          this.todoItems[index] = res;
        },
        error => {
          console.log(error);
        }
      )
    }
  }

  deleteTodoItem(id: number)  {
    this.todoService.deleteTodoItem(id).subscribe(
      res => {
        this.todoItems = this.todoItems.filter(item => item.id !== id);
      },
      error => {
        console.log(error);
      }
    )
  }
}
