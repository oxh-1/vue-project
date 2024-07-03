<template>
  <div>
    <h1>Memory Matching Game</h1>
    <p>Click on parts to reveal and match them!</p>

    <div class="game-board">
      <div class="card" v-for="(card, index) in shuffledCards" :key="index" @click="flipCard(index)">
        <div v-if="card.matched || card.flipped" class="card-content">
          {{ card.part }}
        </div>
        <div v-else class="card-content back-face">
          ?
        </div>
      </div>
    </div>

    <button @click="resetGame">Reset Game</button>
    <button @click="toggleAI">{{ aiActive ? 'Deactivate AI' : 'Activate AI' }}</button>

    <div v-if="aiMoves.length > 0">
      <h2>AI Moves</h2>
      <ul>
        <li v-for="(move, index) in aiMoves" :key="index">{{ move }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';

const parts = ['Part A', 'Part B', 'Part C', 'Part D', 'Part E', 'Part F', 'Part G', 'Part H'];
const cards = ref<Array<{ part: string; flipped: boolean; matched: boolean }>>([]);
let firstCardIndex = -1;
let secondCardIndex = -1;
let aiActive = ref(false);
let aiMoves = ref<Array<string>>([]);
let aiMemory = ref<Array<{ part: string; index: number }>>([]); // AI memory to store flipped cards

// Initialize game state
onMounted(() => {
  initializeGame();
});

// Watcher for aiActive changes
watch(aiActive, (newVal) => {
  if (newVal) {
    aiPlay();
  }
});

// Function to initialize the game
const initializeGame = () => {
  const initialCards = parts.concat(parts).map(part => ({ part, flipped: false, matched: false }));
  cards.value = shuffleArray(initialCards);
  aiMoves.value = [];
  aiMemory.value = [];
};

// Function to shuffle an array
const shuffleArray = (array: any[]) => {
  return array.sort(() => Math.random() - 0.5);
};

// Function to flip a card
const flipCard = (index: number) => {
  if (cards.value[index].flipped || cards.value[index].matched) return;

  cards.value[index].flipped = true;

  if (firstCardIndex === -1) {
    firstCardIndex = index;
  } else {
    secondCardIndex = index;
    checkMatch();
  }
};

// Function to check if two flipped cards match
const checkMatch = () => {
  const card1 = cards.value[firstCardIndex];
  const card2 = cards.value[secondCardIndex];

  if (card1.part === card2.part) {
    card1.matched = true;
    card2.matched = true;
    aiMoves.value.push(`Match found: ${card1.part} & ${card2.part}`);
    aiMemory.value = aiMemory.value.filter(memory => memory.part !== card1.part);
  } else {
    setTimeout(() => {
      card1.flipped = false;
      card2.flipped = false;
      aiMoves.value.push(`Mismatch: ${card1.part} & ${card2.part}`);
    }, 1000);
  }

  resetIndices();
};

// Function to reset first and second card indices
const resetIndices = () => {
  firstCardIndex = -1;
  secondCardIndex = -1;
};

// Function to reset the game
const resetGame = () => {
  initializeGame();
};

// Function to toggle AI activation
const toggleAI = () => {
  aiActive.value = !aiActive.value;
  if (aiActive.value) {
    aiPlay();
  }
};

// Function for AI to play the game
const aiPlay = async () => {
  while (aiActive.value) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Delay AI moves for visibility
    const flippedCards = cards.value.filter(card => card.flipped && !card.matched);

    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;

      if (card1.part === card2.part) {
        card1.matched = true;
        card2.matched = true;
        aiMoves.value.push(`AI found match: ${card1.part} & ${card2.part}`);
        aiMemory.value = aiMemory.value.filter(memory => !memory.part.includes(card1.part));
      } else {
        setTimeout(() => {
          card1.flipped = false;
          card2.flipped = false;
          aiMoves.value.push(`AI flipped back: ${card1.part} & ${card2.part}`);
        }, 1000);
      }
    } else if (flippedCards.length === 1) {
      const randomIndex = Math.floor(Math.random() * cards.value.length);
      const randomCard = cards.value[randomIndex];

      if (!randomCard.flipped && !randomCard.matched) {
        flipCard(randomIndex); // Flip the first card if only one is flipped
        aiMemory.value.push({ part: randomCard.part, index: randomIndex });
        aiMoves.value.push(`AI flipped: ${randomCard.part}`);
      }
    }

    // Check if game is over
    if (cards.value.every(card => card.matched)) {
      aiActive.value = false;
      aiMoves.value.push('Game Over: All cards matched!');
    }
  }
};

// Computed property to shuffle cards whenever updated
const shuffledCards = computed(() => shuffleArray(cards.value));

</script>

<style scoped>
.game-board {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.card {
  width: 100px;
  height: 100px;
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid #ccc;
}

.card-content {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  font-size: 1.2em;
}

.back-face {
  background-color: #6495ed;
  color: white;
}
</style>
