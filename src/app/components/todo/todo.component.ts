import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../classes/todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  @Input() todo: Todo;
  @Output() completeTask = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickCompleteTask() {
    this.completeTask.emit();
  }
}
