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
        this.todos = todos.sort(this.compareTodo);
        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.showingTodos = this.todos.slice(startIndex, endIndex);
        this.lastDateLabel = null;
        this.changeDetectorRef.detectChanges();
      });
  }

  onClickComplete(todo: Todo) {
    this.todoService.remove(todo)
      .subscribe(todos => {
        this.todos = todos.sort(this.compareTodo);
        const startIndex = this.pageIndex * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        this.showingTodos = this.todos.slice(startIndex, endIndex);
        this.lastDateLabel = null;
        this.changeDetectorRef.detectChanges();
      });
  }

  shouldShowDateLabel(todo: Todo) {
    if (todo.deadlineDate !== this.lastDateLabel) {
      this.lastDateLabel = todo.deadlineDate;
      return true;
    }

    return false;
  }

  onPageChanged(pageEvent: PageEvent) {
    const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    const endIndex = startIndex + pageEvent.pageSize;
    this.showingTodos = this.todos.slice(startIndex, endIndex);
    this.lastDateLabel = null;
    this.pageIndex = pageEvent.pageIndex;
  }

  // TODO:比較関数は将来的に動的に変更したい
  // ミリ秒の計算をメソッド化する方法を知ってたらだれか教えて～
  // ↓メソッド化するとこんなエラーが出る(thisがundefinedになってる？？？？)
  // Uncaught TypeError: Cannot read property 'メソッド名' of undefined
  private compareTodo(x: Todo, y: Todo): number {
    const xDate = x.deadlineDate.split('-');
    const xTime = x.deadlineTime.split(':');
    const xRequiredStartTimeMillisecond = new Date(
      parseInt(xDate[0], 10) - 1,
      parseInt(xDate[1], 10) - 1,
      parseInt(xDate[2], 10),
      parseInt(xTime[0], 10),
      parseInt(xTime[1], 10)).getTime() - x.workTimeMinutes * 60 * 1000;

    const yDate = y.deadlineDate.split('-');
    const yTime = y.deadlineTime.split(':');
    const yRequiredStartTimeMillisecond = new Date(
      parseInt(yDate[0], 10) - 1,
      parseInt(yDate[1], 10) - 1,
      parseInt(yDate[2], 10),
      parseInt(yTime[0], 10),
      parseInt(yTime[1], 10)).getTime() - y.workTimeMinutes * 60 * 1000;

    return xRequiredStartTimeMillisecond - yRequiredStartTimeMillisecond;
  }
}
