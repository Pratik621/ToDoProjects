const grid = document.getElementById("grid");
const rows = 20, cols = 20;
let cells = [];
let start = null, end = null;


for (let r = 0; r < rows; r++) {
  cells[r] = [];
  for (let c = 0; c < cols; c++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.row = r;
    cell.dataset.col = c;

    
    cell.addEventListener("click", () => {
      if (!start) {
        cell.classList.add("start");
        start = [r, c];
      } else if (!end) {
        cell.classList.add("end");
        end = [r, c];
      } else {
        cell.classList.toggle("wall");
      }
    });

    grid.appendChild(cell);
    cells[r][c] = cell;
  }
}



document.getElementById("startBtn").addEventListener("click", () => {
  if (!start || !end) {
    alert("Please set a start and end point!");
    return;
  }
  bfs(start, end);
});




function bfs(start, end) {
  let queue = [start];
  let visited = new Set([start.toString()]);
  let parent = {};

  while (queue.length) {
    let [r, c] = queue.shift();
    if (r === end[0] && c === end[1]) {
      return reconstructPath(parent, end);
    }

    for (let [dr, dc] of [[1,0],[-1,0],[0,1],[0,-1]]) {
      let nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        let neighbor = cells[nr][nc];
        if (!neighbor.classList.contains("wall") && !visited.has([nr, nc].toString())) {
          queue.push([nr, nc]);
          visited.add([nr, nc].toString());
          parent[[nr, nc]] = [r, c];
          neighbor.classList.add("visited");
        }
      }
    }
  }
}

function reconstructPath(parent, end) {
  let cur = end;
  while (parent[cur]) {
    let [r, c] = cur;
    cells[r][c].classList.add("path");
    cur = parent[cur];
  }
}