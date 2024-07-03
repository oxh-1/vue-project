<template>
  <div>
    <h1>Maze Game</h1>
    <div class="maze">
      <div v-for="(row, rowIndex) in maze" :key="rowIndex" class="maze-row">
        <div v-for="(cell, colIndex) in row" :key="colIndex" class="maze-cell">
          <div v-if="cell === 'P'" class="player">&nbsp;</div>
          <div v-else-if="cell === 'W'" class="wall">&nbsp;</div>
          <div v-else-if="cell === 'E'" class="exit">&nbsp;</div>
          <div v-else class="path">&nbsp;</div>
        </div>
      </div>
    </div>
    <p v-if="gameOver">Congratulations! You've reached the exit!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const mazeSize = 10; // Size of the maze (maze will be mazeSize x mazeSize)
const maze = ref<Array<Array<string>>>([]);
let playerPosition = ref<{ x: number; y: number }>({ x: 0, y: 0 });
let exitPosition = ref<{ x: number; y: number }>({ x: mazeSize - 1, y: mazeSize - 1 });
let gameOver = ref(false);

// Initialize maze and player position
onMounted(() => {
  initializeMaze();
});

// Function to initialize the maze
const initializeMaze = () => {
  // Initialize maze structure
  for (let i = 0; i < mazeSize; i++) {
    maze.value[i] = [];
    for (let j = 0; j < mazeSize; j++) {
      maze.value[i][j] = Math.random() < 0.3 ? 'W' : ' ';
    }
  }
  maze.value[0][0] = 'P'; // Player start position
  maze.value[mazeSize - 1][mazeSize - 1] = 'E'; // Exit position
};

// Watch for key presses for player movement
onMounted(() => {
  window.addEventListener('keydown', handleKeyPress);
});

// Remove event listener on component unmount
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyPress);
});

// Function to handle key press events
const handleKeyPress = (event: KeyboardEvent) => {
  if (!gameOver.value) {
    switch (event.key) {
      case 'w':
      case 'W':
        movePlayer(0, -1); // Move up
        break;
      case 'a':
      case 'A':
        movePlayer(-1, 0); // Move left
        break;
      case 's':
      case 'S':
        movePlayer(0, 1); // Move down
        break;
      case 'd':
      case 'D':
        movePlayer(1, 0); // Move right
        break;
    }
  }
};

// Function to move the player
const movePlayer = (dx: number, dy: number) => {
  const newX = playerPosition.value.x + dx;
  const newY = playerPosition.value.y + dy;

  // Check if new position is within bounds and not a wall
  if (newX >= 0 && newX < mazeSize && newY >= 0 && newY < mazeSize && maze.value[newY][newX] !== 'W') {
    // Move the player
    maze.value[playerPosition.value.y][playerPosition.value.x] = ' '; // Clear current position
    playerPosition.value.x = newX;
    playerPosition.value.y = newY;
    maze.value[newY][newX] = 'P'; // Update new position

    // Check if player reached the exit
    if (playerPosition.value.x === exitPosition.value.x && playerPosition.value.y === exitPosition.value.y) {
      gameOver.value = true;
    }
  }
};
</script>

<style scoped>
.maze {
  display: grid;
  grid-template-columns: repeat(${mazeSize}, 30px);
  grid-template-rows: repeat(${mazeSize}, 30px);
  gap: 1px;
  margin-top: 20px;
}

.maze-row {
  display: flex;
  flex-direction: row;
}

.maze-cell {
  width: 30px;
  height: 30px;
  background-color: #fff;
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
}

.player {
  background-color: #4caf50; /* Green */
}

.wall {
  background-color: #607d8b; /* Blue-grey */
}

.exit {
  background-color: #f44336; /* Red */
}

.path {
  background-color: #fff; /* White */
}
</style>
