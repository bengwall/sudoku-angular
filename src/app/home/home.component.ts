import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit } from '@angular/core';

import { Board } from './../models/sudoku.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit, AfterViewInit {

  constructor() {
    this.board = new Board();
  }

  board: Board;

  @ViewChildren('cellInput', { read: ElementRef }) cellInputs: QueryList<ElementRef>;

  ngOnInit() {
    this.board.initTestBoard2();
  }

  ngAfterViewInit() {
    // all this to set focus
    const cellInputArray = this.cellInputs.toArray();
    const firstCellInput = cellInputArray[0];
    (firstCellInput.nativeElement as HTMLElement).focus();
  }

  onSubmit() {
    this.board.solve();
    this.board.logBoard();
  }

  onClear() {
    this.board = new Board();
  }

}
