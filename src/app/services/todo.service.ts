import { environment } from '../../environments/environment';

import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { TODOS } from '../mock/mock-todos';

@Injectable()
export class TodoService {

  constructor() { }

  getTodos(): Todo[] {
    if (environment.rum_with === "browser") {
      return TODOS;
    }

    return [];
  }

}
