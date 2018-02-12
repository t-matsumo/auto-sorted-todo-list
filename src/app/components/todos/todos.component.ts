import { Component, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { TODOS } from '../../mock/mock-todos';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos: Todo[] = TODOS;

  constructor() { }

  ngOnInit() {
  }

}
