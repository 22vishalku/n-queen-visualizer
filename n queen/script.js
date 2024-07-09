document.getElementById('solve-button').addEventListener('click', () => {
  const n = parseInt(document.getElementById('n-value').value);
  const solutions = solveNQueens(n);
  displaySolutions(solutions, n);
});

function solveNQueens(n) {
  const solutions = [];
  const board = Array.from({ length: n }, () => Array(n).fill(false));

  function isSafe(row, col) {
      for (let i = 0; i < col; i++) {
          if (board[row][i]) return false;
      }
      for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
          if (board[i][j]) return false;
      }
      for (let i = row, j = col; i < n && j >= 0; i++, j--) {
          if (board[i][j]) return false;
      }
      return true;
  }

  function solve(col) {
      if (col >= n) {
          solutions.push(board.map(row => row.slice()));
          return;
      }
      for (let i = 0; i < n; i++) {
          if (isSafe(i, col)) {
              board[i][col] = true;
              solve(col + 1);
              board[i][col] = false;
          }
      }
  }

  solve(0);
  return solutions;
}

function displaySolutions(solutions, n) {
  const container = document.getElementById('solutions-container');
  container.innerHTML = '';
  if (solutions.length === 0) {
      const message = document.createElement('p');
      message.textContent = `No solutions for N=${n}`;
      container.appendChild(message);
  } else {
      solutions.forEach(solution => {
          const boardElement = document.createElement('div');
          boardElement.className = 'board';
          boardElement.style.gridTemplateColumns = `repeat(${n}, 40px)`;
          solution.forEach(row => {
              row.forEach(cell => {
                  const cellElement = document.createElement('div');
                  cellElement.className = 'cell';
                  if (cell) {
                      cellElement.classList.add('queen');
                      cellElement.textContent = '♛';
                  }
                  boardElement.appendChild(cellElement);
              });
          });
          container.appendChild(boardElement);
      });
      // Scroll to the top of the solutions container
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
