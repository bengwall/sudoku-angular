export class Cell {
  value?: number;
  possibleValues: number[];
  groups: CellGroup[];

  constructor() {
    this.possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    // create the 3 groups for this cell (column, row, quad)
    this.groups = Array<CellGroup>();
    for (let i = 0; i <= 2; i++) {
      const cellGroup = new CellGroup();
      this.groups.push(cellGroup);
    }
  }

  removePossibleValue(value) {
    const idx = this.possibleValues.indexOf(value);
    if (idx === -1) { return false; }
    this.possibleValues.splice(idx, 1);
    return true;
  }

}

export class CellGroup {
  cells: Cell[];

  constructor() {
    this.cells = new Array<Cell>();
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
        this.cells[row].push(new Cell());
      });
    });

    // initialize all cells
    this.positions.forEach(row => {
      this.positions.forEach(col => {
        const cell = this.cells[row][col];

        // create the 3 groups for this cell (column, row, quad)
        const rowGroup = cell.groups[0];
        this.positions.forEach(iCol => {
          if (iCol !== col) {
            rowGroup.cells.push(this.cells[row][iCol]);
          }
        });

        const colGroup = cell.groups[1];
        this.positions.forEach(iRow => {
          if (iRow !== row) {
            colGroup.cells.push(this.cells[iRow][col]);
          }
        });

        const quadGroup = cell.groups[2];
        const quadRow = Math.floor(row / 3) * 3;
        const quadCol = Math.floor(col / 3) * 3;
        for (let iRow = quadRow; iRow <= quadRow + 2; iRow++) {
          for (let iCol = quadCol; iCol <= quadCol + 2; iCol++) {
            if (!(iCol === col && iRow === row)) {
              quadGroup.cells.push(this.cells[iRow][iCol]);
            }
          }
        }

      });
    });

  }

  solve() {
    this.solved = false;
    while (!this.solved) {
      let processedSomething = false;
      this.positions.forEach(row => {
        this.positions.forEach(col => {
          const cell = this.cells[row][col];

          if (cell.value == null) {
            cell.groups.forEach(group => {

              group.cells.forEach(groupCell => {
                // if the groupCell has a value, then remove that value from the cell.remainingValues
                if (groupCell.value) {
                  if (cell.removePossibleValue(groupCell.value)) {
                    processedSomething = true;
                    if (cell.possibleValues.length === 1) {
                      cell.value = cell.possibleValues[0];
                    }
                  }
                }
              });

            });
          }

        });
      });
      // if we make it through all cells and have done anything, then we are stuck or done
      this.solved = !processedSomething;
    }
    return this.solved;
  }

  logBoard() {
    this.positions.forEach(row => {
      this.positions.forEach(col => {
        const cell = this.cells[row][col];
        console.log(`row: ${row}  col: ${col}  value: ${cell.value}`);
      });
    });
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
