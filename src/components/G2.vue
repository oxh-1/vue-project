<template>
  <div id="app">
    <h1>Number Guessing Game</h1>
    <div v-if="!gameStarted">
      <label for="targetNumber">Choose a number between 1 and 100:</label>
      <input type="number" id="targetNumber" v-model="targetNumber" min="1" max="100">
      <button @click="startGame">Start Game</button>
    </div>
    <div v-if="gameStarted">
      <p v-if="!gameOver">AI Guess: {{ aiGuess }}</p>
      <p v-if="!gameOver">{{ resultMessage }}</p>
      <ul>
        <li v-for="(step, index) in steps" :key="index">
          Step {{ index + 1 }}: AI guessed {{ step.guess }} - {{ step.result }}
        </li>
      </ul>
      <p v-if="gameOver && !gameWon">AI couldn't guess the number in 7 attempts.</p>
      <p v-if="gameWon">AI guessed it right! The number is {{ targetNumber }}.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      gameStarted: false,
      gameOver: false,
      gameWon: false,
      targetNumber: 0,
      aiGuess: 0,
      low: 1,
      high: 100,
      attempts: 0,
      steps: []
    };
  },
  methods: {
    startGame() {
      if (this.targetNumber >= 1 && this.targetNumber <= 100) {
        this.gameStarted = true;
        this.binarySearch();
      } else {
        alert('Please choose a number between 1 and 100.');
      }
    },
    binarySearch() {
      this.steps = []; // Reset steps history
      this.low = 1; // Reset low
      this.high = 100; // Reset high
      this.attempts = 0; // Reset attempts

      while (this.low <= this.high && this.attempts < 7) {
        this.aiGuess = Math.floor((this.low + this.high) / 2);
        this.attempts++;
        let result;
        if (this.aiGuess === this.targetNumber) {
          result = 'Correct';
          this.gameOver = true;
          this.gameWon = true;
        } else if (this.aiGuess < this.targetNumber) {
          result = 'Too low';
          this.low = this.aiGuess + 1;
        } else {
          result = 'Too high';
          this.high = this.aiGuess - 1;
        }
        this.steps.push({ guess: this.aiGuess, result: result });
        if (this.gameWon) return;
      }
      this.gameOver = true;
    }
  },
  computed: {
    resultMessage() {
      if (this.aiGuess < this.targetNumber) {
        return "AI guessed too low.";
      } else if (this.aiGuess > this.targetNumber) {
        return "AI guessed too high.";
      } else {
        return "AI guessed correctly!";
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  margin-top: 50px;
}

input[type=number] {
  width: 50px;
  margin: 0 10px;
}

button {
  margin-top: 10px;
  padding: 5px 10px;
  cursor: pointer;
}
</style>
