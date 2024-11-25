export function minCostPath(grid: number[][]): number {
  if (!grid || grid.length === 0 || grid[0].length === 0) return 0;

  const rows = grid.length;
  const cols = grid[0].length;

  const cost: number[][] = Array.from({ length: rows }, () =>
    Array(cols).fill(0)
  );

  cost[0][0] = grid[0][0];

  for (let j = 1; j < cols; j++) {
    cost[0][j] = cost[0][j - 1] + grid[0][j];
    cost[j][0] = cost[j - 1][0] + grid[j][0];
  }

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      cost[i][j] = Math.min(cost[i - 1][j], cost[i][j - 1]) + grid[i][j];
    }
  }

  return cost[rows - 1][cols - 1];
}
