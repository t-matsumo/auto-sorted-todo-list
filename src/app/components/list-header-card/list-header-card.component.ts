import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-list-header-card',
  templateUrl: './list-header-card.component.html',
  styleUrls: ['./list-header-card.component.scss']
})
export class ListHeaderCardComponent implements OnInit {
 @Input() content: string;

  constructor() { }

  ngOnInit() {
  }

}
