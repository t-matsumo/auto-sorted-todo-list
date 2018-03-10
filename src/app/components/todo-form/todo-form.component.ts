import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Todo } from '../../models/todo';
import { TodoService } from '../../providers/todo.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, OnChanges {
  todoForm: FormGroup;

  constructor(private todoService: TodoService, private changeDetectorRef: ChangeDetectorRef,
    private fb: FormBuilder, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    const todo = this.todoForm.value;
    this.todoService.save(todo);

    this.ngOnChanges();

    this.snackBar.open('リストに追加しました', 'OK', {
      duration: 3000
    });
  }

  ngOnChanges() {
    this.todoForm.reset();
  }

  createForm() {
    this.todoForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(30)]],
      content: ['', [Validators.required, Validators.maxLength(100)]],
      deadlineDate: ['', Validators.required],
      deadlineTime: ['', Validators.required],
      workTimeMinutes: ['', [Validators.required, Validators.min(0), Validators.max(1440)]],
    });
  }
}
