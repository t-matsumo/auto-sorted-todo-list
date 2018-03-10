import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  @Input() todo: Todo;
  @Output() clickCompleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onClickComplete() {
    this.clickCompleteEvent.emit();
  }
}
