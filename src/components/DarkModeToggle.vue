<template>
  <div class="mode-toggle">
    <input type="checkbox" id="darkmode-toggle" v-model="isChecked" @change="toggleDarkMode">
    <label class="darkmode-toggle" :for="toggleId">{{ isChecked ? 'Light Mode' : 'Dark Mode' }}</label>
  </div>
</template>

<script setup>
import { ref, emit } from 'vue';

const isChecked = ref(false);
const toggleId = 'darkmode-toggle';

const toggleDarkMode = () => {
  isChecked.value = !isChecked.value;
  emit('toggle', isChecked.value);
};
</script>

<style scoped>
.mode-toggle {
  display: inline-block;
  position: relative;
}

.darkmode-toggle {
  cursor: pointer;
}
</style>
