import { Component, OnInit } from '@angular/core';
import { Cell, CellGroup, Board } from './../models/cell.model';
import { collectExternalReferences } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  board: Board;

  constructor() {
    this.board = new Board();
  }

  ngOnInit() {
    this.board.initTestBoard();
    this.board.solve();
    this.board.logBoard();
  }

}
