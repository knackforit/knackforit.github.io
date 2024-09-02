window.addEventListener('load', function() {
  var canvas = document.querySelector('canvas');
  var ctx = canvas.getContext('2d');

  // Set canvas dimensions to match the window size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Maze configuration
  var cellSize = 20;
  var rows = Math.floor(canvas.height / cellSize);
  var cols = Math.floor(canvas.width / cellSize);

  // Generate the maze
  var maze = generateMaze(rows, cols);

  // Draw the maze
  drawMaze(ctx, maze, cellSize);

  // Draw the red line in random directions
  drawRandomLine(ctx, maze, cellSize);
});

function generateMaze(rows, cols) {
  var maze = new Array(rows);
  for (var i = 0; i < rows; i++) {
    maze[i] = new Array(cols).fill(0);
  }

  // Recursive backtracking algorithm to generate the maze
  function carve(row, col) {
    maze[row][col] = 1;

    var directions = shuffle([[0, 1], [0, -1], [1, 0], [-1, 0]]);

    for (var i = 0; i < directions.length; i++) {
      var newRow = row + directions[i][0] * 2;
      var newCol = col + directions[i][1] * 2;

      if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && maze[newRow][newCol] === 0) {
        maze[row + directions[i][0]][col + directions[i][1]] = 1;
        carve(newRow, newCol);
      }
    }
  }

  carve(1, 1);
  return maze;
}

function drawMaze(ctx, maze, cellSize) {
  for (var row = 0; row < maze.length; row++) {
    for (var col = 0; col < maze[0].length; col++) {
      if (maze[row][col] === 0) {
        ctx.fillStyle = '#000';
        ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
      }
    }
  }
}

function drawRandomLine(ctx, maze, cellSize) {
  var row = 1;
  var col = 1;

  ctx.strokeStyle = 'red';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);

  function step() {
    var directions = shuffle([[0, 1], [0, -1], [1, 0], [-1, 0]]);

    for (var i = 0; i < directions.length; i++) {
      var newRow = row + directions[i][0];
      var newCol = col + directions[i][1];

      if (newRow >= 0 && newRow < maze.length && newCol >= 0 && newCol < maze[0].length && maze[newRow][newCol] === 1) {
        row = newRow;
        col = newCol;
        ctx.lineTo(col * cellSize + cellSize / 2, row * cellSize + cellSize / 2);
        ctx.stroke();
        break;
      }
    }

    if (row === maze.length - 2 && col === maze[0].length - 2) {
      return;
    }

    requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}