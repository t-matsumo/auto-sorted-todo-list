import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todo: Todo = new Todo(1, 'やること1', "2018-02-22", 12);

  constructor() { }

  ngOnInit() {
  }

  newTodo() {
    // TODO:実装
  }
}
