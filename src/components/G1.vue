<template>
  <div>
    <h1>Tic-Tac-Toe Game</h1>
    <div class="board">
      <div class="row" v-for="(row, rowIndex) in board" :key="rowIndex">
        <div
          class="cell"
          v-for="(cell, colIndex) in row"
          :key="colIndex"
          @click="cellClicked(rowIndex, colIndex)"
        >
          {{ cell }}
        </div>
      </div>
    </div>
    <div v-if="winner">
      <p>Winner: {{ winner }}</p>
    </div>
    <div v-else>
      <p v-if="isDraw && !winner">It's a draw!</p>
      <p v-else>Current Turn: {{ currentPlayer }}</p>
    </div>
    <button @click="resetGame">Reset Game</button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const boardSize = 3;
const initialBoard = Array(boardSize)
  .fill(null)
  .map(() => Array(boardSize).fill(''));

const currentPlayer = ref('X');
const board = ref(initialBoard);
const winner = ref('');
const isDraw = ref(false);

// Function to check if the game is over
const isGameOver = () => {
  return !!winner.value || isDraw.value;
};

// Function to check if a player has won
const checkWinner = () => {
  // Check rows
  for (let i = 0; i < boardSize; i++) {
    if (
      board.value[i][0] &&
      board.value[i][0] === board.value[i][1] &&
      board.value[i][1] === board.value[i][2]
    ) {
      winner.value = board.value[i][0];
      return;
    }
  }

  // Check columns
  for (let i = 0; i < boardSize; i++) {
    if (
      board.value[0][i] &&
      board.value[0][i] === board.value[1][i] &&
      board.value[1][i] === board.value[2][i]
    ) {
      winner.value = board.value[0][i];
      return;
    }
  }

  // Check diagonals
  if (
    board.value[0][0] &&
    board.value[0][0] === board.value[1][1] &&
    board.value[1][1] === board.value[2][2]
  ) {
    winner.value = board.value[0][0];
    return;
  }
  if (
    board.value[0][2] &&
    board.value[0][2] === board.value[1][1] &&
    board.value[1][1] === board.value[2][0]
  ) {
    winner.value = board.value[0][2];
    return;
  }

  // Check for draw
  if (!board.value.flat().includes('') && !winner.value) {
    isDraw.value = true;
  }
};

// AI's turn - make a random move
const aiMove = () => {
  if (isGameOver()) return;

  let row, col;
  do {
    row = Math.floor(Math.random() * boardSize);
    col = Math.floor(Math.random() * boardSize);
  } while (board.value[row][col] !== '');

  board.value[row][col] = currentPlayer.value;
  checkWinner();
  togglePlayer();
};

// Function to handle player's move
const cellClicked = (row: number, col: number) => {
  if (board.value[row][col] === '' && !isGameOver()) {
    board.value[row][col] = currentPlayer.value;
    checkWinner();
    togglePlayer();
    // AI makes a move after a delay (simulate thinking time)
    setTimeout(aiMove, 500);
  }
};

// Toggle between players
const togglePlayer = () => {
  currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
};

// Reset the game
const resetGame = () => {
  // Clear the board
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      board.value[i][j] = '';
    }
  }
  winner.value = '';
  isDraw.value = false;
  currentPlayer.value = 'X'; // Ensure X starts after reset
};

// Watch for changes in winner or draw state
watch([winner, isDraw], () => {
  // If AI wins, announce it
  if (winner.value === 'O') {
    setTimeout(() => {
      alert('AI wins!');
    }, 100);
  }
}, { deep: true });

</script>

<style scoped>
.board {
  display: inline-grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(3, 100px);
}

.cell {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2em;
  cursor: pointer;
}
</style>
