import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {
  todo: Todo = { id: 1, todo: 'やること1', deadLine: "2018-02-22", workTime: 12 };

  constructor() { }

  ngOnInit() {
  }

  newTodo() {
    // TODO:実装
  }
}
