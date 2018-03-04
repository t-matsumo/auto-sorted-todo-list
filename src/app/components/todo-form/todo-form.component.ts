import { Component, OnInit, ChangeDetectorRef, OnChanges } from '@angular/core';
import { Todo } from '../../classes/todo';
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
    this.snackBar.open('リストに追加しました', 'OK', {
      duration: 3000
    });

    this.ngOnChanges();
  }

  ngOnChanges() {
    this.todoForm.reset();
  }

  createForm() {
    this.todoForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      deadlineDate: ['', Validators.required],
      deadlineTime: ['', Validators.required],
      workTimeMinutes: ['', [Validators.required, Validators.min(0), Validators.pattern(/([1-9][0-9]*)|0/)]],
    });
  }
}
