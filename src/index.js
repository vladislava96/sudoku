module.exports = function solveSudoku(matrix) {
  
  const grid = [];

  matrix.forEach(r => {
      grid.push([...r])
  });

  //Sudoku solver 
  function doSolve(row = 0, col = 0) {
      let pos = findZepoPosition(row, col);
      row = pos[0];
      col = pos[1];

      if (row == -1) {
          return true;
      }

      for (let n = 1; n <= 9; n++) {
          if (noInRow(row, n) && noInCol(col, n) && noInGrid(row, col, n)) {
              grid[row][col] = n;

              if (doSolve(row, col)) {
                  return true;
              }

              grid[row][col] = 0;
          }
      } // for

      return false;
  }

  function findZepoPosition(row, col) {
      let pos = [-1, -1];

      loop1:
      for (let i = row; i < 9; i++) {
          for (let j = col; j < 9; j++) {
              if (grid[i][j] === 0) {
                  pos[0] = i;
                  pos[1] = j;
                  break loop1;
              }
          }
          col = 0;
      }
      return pos;
  } // findZepoPosition

  function noInRow(row, num) {
      for (let col = 0; col < 9; col++) {
          if (grid[row][col] === num) return false;
      }
      return true;
  }

  function noInCol(col, num) {
      for (var row = 0; row < 9; row++) {
          if (grid[row][col] === num) return false;
      }

      return true;
  }

  function noInGrid(row, col, num) {
      row = Math.floor(row / 3) * 3;
      col = Math.floor(col / 3) * 3;

      for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
              if (grid[row + r][col + c] === num) return false;
          }
      }
      return true;
  }
  doSolve();
  return grid;
}