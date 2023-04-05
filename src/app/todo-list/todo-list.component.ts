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
  groupedTodoItems: { [key: string]: TodoItem[] } = {};

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
    this.getAllTodoItems();
  }

  getAllTodoItems() {
    this.todoService.getAllTodoItems().subscribe(
      items => {
        this.todoItems = items;
        this.groupTodoItems();
      },
      error => {
        console.log(error);
      }
    )
  }
  
  createNewTodoItem(todoItem: TodoItem) {
    this.todoService.createNewTodoItem(todoItem).subscribe(
      item => {
        this.todoItems.push(item)
        this.groupTodoItems();
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
          this.groupTodoItems();
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
        this.groupTodoItems();
      },
      error => {
        console.log(error);
      }
    )
  }

  private groupTodoItems(): void {
    this.groupedTodoItems = this.todoItems.reduce((acc: {[key: string]: TodoItem[]}, item) => {
      const key = item.completed ? 'completed' : 'uncompleted';
      return {
        ...acc,
        [key]: [...(acc[key] || []), item]
      };
    }, {});
  }
}
