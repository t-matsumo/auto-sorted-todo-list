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

  remove(todo: Todo): Observable<Todo[]> {
    return this.electronService.remove(todo);
  }

  getShowingTodos(todos: Todo[], pageIndex: number, pageSize: number): Todo[] {
    const startIndex = pageIndex * pageSize;
    const endIndex = startIndex + pageSize;
    return todos.slice(startIndex, endIndex);
  }

  calcRequiredStartTimeMillisecond(todo: Todo) {
    const date = todo.deadlineDate.split('-');
    const time = todo.deadlineTime.split(':');
    const requiredStartTimeMillisecond = new Date(
      parseInt(date[0], 10) - 1,
      parseInt(date[1], 10) - 1,
      parseInt(date[2], 10),
      parseInt(time[0], 10),
      parseInt(time[1], 10)).getTime() - todo.workTimeMinutes * 60 * 1000;

    return requiredStartTimeMillisecond;
  }
}
