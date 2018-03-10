import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';

// If you import a module but never use any of the imported values other than as TypeScript types,
// the resulting javascript file will look as if you never imported the module at all.
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';
import { SelectorMethodSignature } from 'rxjs/observable/FromEventObservable';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ElectronService {

  readonly ipcRenderer: typeof ipcRenderer;
  readonly childProcess: typeof childProcess;

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

  send(channel: string, ...args: any[]): void {
    this.ipcRenderer.send(channel, args);
  }

  fromChannel<T>(channel: string): Observable<T> {
    return fromEvent<T>(this.ipcRenderer, channel, (event, data) => {
      console.log('aaaa');
      this.ipcRenderer.removeAllListeners(channel);
      return data;
    });
  }
}
