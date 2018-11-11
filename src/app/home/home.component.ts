import { Component, OnInit } from '@angular/core';
import { Cell, CellGroup } from './../models/cell.model';
import { collectExternalReferences } from '@angular/compiler';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {

  cells: Cell[][];
  positions: number[];

  constructor() {
    this.cells = new Array<Array<Cell>>();

    this.positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    // create all cells.
    for (let row = 0; row <= 8; row++) {
      this.cells.push([]);
      for (let col = 0; col <= 8; col++) {
        this.cells[row].push(new Cell());
      }
    }

    // initialize all cells
    for (let row = 0; row <= 8; row++) {
      for (let col = 0; col <= 8; col++) {
        const cell = this.cells[row][col];

        // create the 3 groups for this cell (column, row, quad)
        const rowGroup = cell.groups[0];
        for (let iCol = 0; iCol <= 8; iCol++) {
          if (iCol !== col) {
            rowGroup.cells.push(this.cells[row][iCol]);
          }
        }

        const colGroup = cell.groups[1];
        for (let iRow = 0; iRow <= 8; iRow++) {
          if (iRow !== row) {
            colGroup.cells.push(this.cells[iRow][col]);
          }
        }

        const quadGroup = cell.groups[2];
        const quadRow = Math.floor(row / 3) * 3;
        const quadCol = Math.floor(col / 3) * 3;
        console.log(`quadRow: ${quadRow}  quadCol: ${quadCol}  row: ${row}  col: ${col}  Math.floor(row): ${Math.floor(row / 3)}   Math.floor(col): ${Math.floor(col / 3)}`);
        for (let iRow = quadRow; iRow <= quadRow + 2; iRow++) {
          for (let iCol = quadCol; iCol <= quadCol + 2; iCol++) {
            if (!(iCol === col && iRow === row)) {
              quadGroup.cells.push(this.cells[iRow][iCol]);
            }
          }
        }

      }
    }

  }

  ngOnInit() {
    this.cells[0][4].value = 9;
    this.cells[0][8].value = 3;
    this.cells[1][2].value = 3;
    this.cells[1][3].value = 5;
    this.cells[1][8].value = 1;
    this.cells[2][1].value = 6;
    this.cells[2][2].value = 8;
    this.cells[2][3].value = 3;
    this.cells[2][6].value = 7;

    this.cells[3][1].value = 2;
    this.cells[3][4].value = 5;
    this.cells[4][1].value = 5;
    this.cells[4][2].value = 9;
    this.cells[4][3].value = 7;
    this.cells[4][4].value = 6;
    this.cells[4][5].value = 3;
    this.cells[4][6].value = 4;
    this.cells[4][7].value = 8;
    this.cells[5][4].value = 1;
    this.cells[5][7].value = 5;

    this.cells[6][2].value = 7;
    this.cells[6][5].value = 4;
    this.cells[6][6].value = 6;
    this.cells[6][7].value = 9;
    this.cells[7][0].value = 4;
    this.cells[7][5].value = 7;
    this.cells[7][6].value = 3;
    this.cells[8][0].value = 6;
    this.cells[8][4].value = 8;

    let solved = false;

    while (!solved) {
      let processedSomething = false;
      for (let row = 0; row <= 8; row++) {
        for (let col = 0; col <= 8; col++) {
          const cell = this.cells[row][col];

          if (cell.value == null) {
            cell.groups.forEach(group => {

              group.cells.forEach(groupCell => {
                // if the groupCell has a value, then remove that value from the cell.remainingValues
                if (groupCell.value) {
                  const idx = cell.possibleValues.indexOf(groupCell.value);
                  if (idx > -1) {
                    cell.possibleValues.splice(idx, 1);
                    processedSomething = true;
                    if (cell.possibleValues.length === 1) {
                      cell.value = cell.possibleValues[0];
                    }
                  }
                }
              });

            });
          }

        }
      }
      // if we make it through all cells and have done anything, then we are stuck or done
      solved = !processedSomething;
    }

    for (let row = 0; row <= 8; row++) {
      for (let col = 0; col <= 8; col++) {
        const cell = this.cells[row][col];
        console.log(`row: ${row}  col: ${col}  value: ${cell.value}`);
      }
    }

  }

}
