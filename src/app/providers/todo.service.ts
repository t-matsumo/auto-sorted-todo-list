import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Todo } from '../classes/todo';

@Injectable()
export class TodoService {
  todos: Todo[];

  constructor() { }

  getTodos(): Observable<Todo[]> {
    return of([{
      id: 1,
      title: 'あれ',
      content: 'これ',
      deadline: '2018-02-26',
      workTimeMinutes: 15,
    },
    {
      id: 2,
      title: 'それ',
      content: 'どれ',
      deadline: '2018-02-26',
      workTimeMinutes: 30,
    }]);
  }
}
