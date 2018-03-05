import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Todo } from '../../classes/todo';
import { TodoService } from '../../providers/todo.service';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];
  showingTodos: Todo[];
  lastDateLabel: string;
  pageSize = 5;
  pageIndex = 0;

  constructor(private todoService: TodoService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todos = todos.sort((x, y) =>
          this.todoService.calcRequiredStartTimeMillisecond(x) - this.todoService.calcRequiredStartTimeMillisecond(y));
        this.showingTodos = this.todoService.getShowingTodos(this.todos, this.pageIndex, this.pageSize);
        this.lastDateLabel = null;
        this.changeDetectorRef.detectChanges();
      });
  }

  onClickComplete(todo: Todo) {
    this.todoService.remove(todo)
      .subscribe(todos => {
        this.todos = todos.sort((x, y) =>
          this.todoService.calcRequiredStartTimeMillisecond(x) - this.todoService.calcRequiredStartTimeMillisecond(y));
        this.showingTodos = this.todoService.getShowingTodos(this.todos, this.pageIndex, this.pageSize);
        this.lastDateLabel = null;
        this.changeDetectorRef.detectChanges();
      });
  }

  onPageChanged(pageEvent: PageEvent) {
    this.showingTodos = this.todoService.getShowingTodos(this.todos, pageEvent.pageIndex, pageEvent.pageSize);
    this.lastDateLabel = null;
    this.pageIndex = pageEvent.pageIndex;
  }

  shouldShowDateLabel(todo: Todo): boolean {
    if (todo.deadlineDate !== this.lastDateLabel) {
      this.lastDateLabel = todo.deadlineDate;
      return true;
    }

    return false;
  }
}
