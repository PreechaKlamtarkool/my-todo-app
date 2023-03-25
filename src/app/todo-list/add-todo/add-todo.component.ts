import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TodoItem } from '../../models/todo-item';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {

  @Output() todoAdded = new EventEmitter<TodoItem>();

  name = new FormControl('', [Validators.required]);

  onAdd() {
    if(this.name.valid) {
      const todo: TodoItem = {
        title: this.name.value as string,
        completed: false
      }
      this.todoAdded.emit(todo);
      this.name.reset();
    }
  }
}
