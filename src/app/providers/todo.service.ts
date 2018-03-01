import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Todo } from '../classes/todo';
import { ElectronService } from './electron.service';

@Injectable()
export class TodoService {

  constructor(private electronService: ElectronService) { }

  getTodos(): Observable<Todo[]> {
    return this.electronService.getTodos();
  }

  save(todo: Todo) {
    this.electronService.save(todo);
  }
}
