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

  compareTodo(x: Todo, y: Todo): number {
    const result: number = x.deadline.localeCompare(y.deadline);
    if (result === 0) {
      return x.workTimeMinutes - y.workTimeMinutes;
    }

    return result;
  }
}
