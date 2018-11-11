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
}

export class CellGroup {
  cells: Cell[];

  constructor() {
    this.cells = new Array<Cell>();
  }
}
