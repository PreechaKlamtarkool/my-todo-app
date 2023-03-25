import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TodoItem } from '../../models/todo-item';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent { 

  @Input() todoItem!: TodoItem; 
  @Output() todoUpdated = new EventEmitter<TodoItem>()
  @Output() todoDeleted = new EventEmitter<number>()

  toggleCompleted() {
    this.todoItem.completed = !this.todoItem.completed;
    this.todoUpdated.emit(this.todoItem);
  }

  onDelete() {
    if(this.todoItem.id) {
      this.todoDeleted.emit(this.todoItem.id);
    }
  }

}
