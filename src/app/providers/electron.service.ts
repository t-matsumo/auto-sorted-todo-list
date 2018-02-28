import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { Observable } from 'rxjs/Observable';
import { Todo } from '../classes/todo';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';

@Injectable()
export class ElectronService {

  ipcRenderer: typeof ipcRenderer;
  childProcess: typeof childProcess;

  constructor() {
    // Conditional imports
    if (this.isElectron()) {
      this.ipcRenderer = window.require('electron').ipcRenderer;
      this.childProcess = window.require('child_process');
    }
  }

  isElectron = () => {
    return window && window.process && window.process.type;
  }

  getTodos(): Observable<Todo[]> {
    this.ipcRenderer.send('todos');
    return fromEvent<Todo[]>(this.ipcRenderer, 'todos', (event, todos) => {
      return todos;
    });
  }
}
