import { environment } from '../../environments/environment';
import { ipcRenderer } from 'electron';

import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { TODOS } from '../mock/mock-todos';

@Injectable()
export class TodoService {
  private todos: Todo[];

  constructor() { }

  getTodos(): Todo[] {
    if (environment.rum_with === 'browser') {
      return TODOS;
    }

    if (this.todos === undefined) {
      this.todos = ipcRenderer.sendSync('getAllTodo');
    }

    return this.todos;
  }

  saveTodo(todo: Todo) {
    if (environment.rum_with === 'browser') {
      return;
    }

    ipcRenderer.send('saveTodo', todo);
  }

}
