import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todo: Todo = new Todo(1, 'やること1', "2018-02-22", 12);

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  newTodo(todo: Todo): void {
    this.todoService.saveTodo(todo);
  }
}
