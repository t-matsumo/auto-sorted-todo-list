import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Todo } from '../../classes/todo';
import { TodoService } from '../../providers/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[];

  constructor(private todoService: TodoService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos.sort(this.compareTodo);
        this.changeDetectorRef.detectChanges();
      });
  }

  removeTask(todo: Todo) {
    this.todoService.remove(todo)
      .subscribe(todos => {
        this.todos = todos.sort(this.compareTodo);
        this.changeDetectorRef.detectChanges();
      });
  }

  // TODO:比較関数は動的に変更したい
  private compareTodo(x: Todo, y: Todo): number {
    let result: number = x.deadlineDate.localeCompare(y.deadlineDate);
    if (result !== 0) {
      return result;
    }

    result = x.deadlineTime.localeCompare(y.deadlineTime);
    if (result !== 0) {
      return result;
    }

    return x.workTimeMinutes - y.workTimeMinutes;
  }
}
