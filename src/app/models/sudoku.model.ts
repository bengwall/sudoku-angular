export class Cell {
  value?: number;
  possibleValues: number[];
  relatedCells: Cell[];
  row: number;
  col: number;

  constructor(row, col) {
    this.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.relatedCells = new Array<Cell>(); // 24 related cells
    this.row = row;
    this.col = col;
  }

  setValue(value) {
    this.value = value;
    this.possibleValues = [];
    this.removeValueFromRelatedCells(value);
    console.log(`Setting value (${this.row},${this.col}) = ${value}`);
  }

  removePossibleValue(value) {
    const idx = this.possibleValues.indexOf(value);
    if (idx === -1) { return false; }
    this.possibleValues.splice(idx, 1);
    return true;
  }

  removeValueFromRelatedCells(value) {
    this.relatedCells.forEach(cell => {
      cell.removePossibleValue(value);
    });
  }
}

export class Board {
  cells: Cell[][];
  positions: number[];
  solved: boolean;

  constructor() {
    this.cells = new Array<Array<Cell>>();
    this.positions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    this.solved = false;

    // create all cells.
    this.positions.forEach(row => {
      this.cells.push([]);
      this.positions.forEach(col => {
        this.cells[row].push(new Cell(row, col));
      });
    });

    // initialize all cells
    this.positions.forEach(row => {
      this.positions.forEach(col => {
        const cell = this.cells[row][col];

        // add refeference to associated cells in the 3 groups for this cell (column, row, quad)
        this.positions.forEach(iCol => {
          if (iCol !== col) {
            cell.relatedCells.push(this.cells[row][iCol]);
          }
        });

        this.positions.forEach(iRow => {
          if (iRow !== row) {
            cell.relatedCells.push(this.cells[iRow][col]);
          }
        });

        const quadRow = Math.floor(row / 3) * 3;
        const quadCol = Math.floor(col / 3) * 3;
        for (let iRow = quadRow; iRow <= quadRow + 2; iRow++) {
          for (let iCol = quadCol; iCol <= quadCol + 2; iCol++) {
            if (!(iCol === col && iRow === row)) {
              cell.relatedCells.push(this.cells[iRow][iCol]);
            }
          }
        }

      });
    });

  }

  solve() {
    this.solved = false;

    // update possible values of all cells based on starting cell values
    this.cells.forEach(cellRow =>
      cellRow.forEach(cell => {
        if (cell.value != null) {
          cell.setValue(cell.value);
        }
      })
    );

    let finished = false;
    while (!finished) {
      let processedSomething = false;
      this.cells.forEach(cellRow => {
        cellRow.forEach(cell => {

          if (cell.value == null) {
            if (cell.possibleValues.length === 1) {
              processedSomething = true;
              cell.setValue(cell.possibleValues[0]);
            }
          }

        });
      });
      // if we make it through all cells and have done anything, then we are stuck or done
      finished = !processedSomething;
    }

    // update possible values of all cells based on starting cell values
    this.solved = true;
    this.cells.forEach(cellRow =>
      cellRow.forEach(cell => {
        if (cell.value == null) { this.solved = false; }
      })
    );
    return this.solved;
  }

  logBoard() {
    this.cells.forEach(cellRow => {
      let str = '';
      cellRow.forEach(cell => {
        str = str + (cell.value || '_') + ' ';
      });
      console.log(str);
    });

    this.cells.forEach(cellRow => {
      cellRow.forEach(cell => {
        console.log(`(${cell.row},${cell.col}) = ${cell.value} - Possible values: ${cell.possibleValues}`);
      });
    }); \
  }

  initTestBoard1() {
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
  }

  initTestBoard2() {
    this.cells[0][3].value = 8;
    this.cells[0][6].value = 3;
    this.cells[0][7].value = 2;
    this.cells[1][2].value = 6;
    this.cells[1][8].value = 5;
    this.cells[2][0].value = 1;
    this.cells[2][1].value = 8;
    this.cells[2][3].value = 5;
    this.cells[2][6].value = 9;

    this.cells[3][1].value = 9;
    this.cells[3][6].value = 5;
    this.cells[4][0].value = 2;
    this.cells[4][4].value = 8;
    this.cells[4][8].value = 7;
    this.cells[5][2].value = 4;
    this.cells[5][7].value = 6;

    this.cells[6][2].value = 1;
    this.cells[6][5].value = 2;
    this.cells[6][7].value = 3;
    this.cells[6][8].value = 4;
    this.cells[7][0].value = 9;
    this.cells[7][6].value = 1;
    this.cells[8][1].value = 7;
    this.cells[8][2].value = 2;
    this.cells[8][5].value = 6;
  }


}
