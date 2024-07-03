<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <LanguageSwitcher />
    <button @click="toggleDarkMode" class="mode-switch">
      {{ isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode' }}
    </button>

    <button @click="goBack" class="btn btn-dark mb-3">    {{ $t('B') }}
</button>
    <router-view />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import LanguageSwitcher from './components/LanguageSwitcher.vue';

const isDarkMode = ref(false);

const applyDarkMode = () => {
  document.body.classList.toggle('dark-mode', isDarkMode.value);
};

const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value;
  applyDarkMode();
};

onMounted(() => {
  applyDarkMode(); // Apply dark mode if it's already toggled on mount
});

import { useRouter } from 'vue-router';
import Page1 from './components/Page1.vue';
import Page2 from './components/Page2.vue';

const router = useRouter();

const goBack = () => {
  router.push('/');
};

</script>

<style>
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 222.2 47.4% 11.2%;
  --border: 214.3 31.8% 91.4%;
  --input: 214.3 31.8% 91.4%;
  --card: 0 0% 100%;
  --card-foreground: 222.2 47.4% 11.2%;
  --primary: 222.2 47.4% 11.2%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --accent: 210 40% 96.1%;
  --accent-foreground: 222.2 47.4% 11.2%;
  --destructive: 0 100% 50%;
  --destructive-foreground: 210 40% 98%;
  --ring: 215 20.2% 65.1%;
  --radius: 0.5rem;
}

body.dark-mode {
  --background: 224 71% 4%;
  --foreground: 213 31% 91%;
  --muted: 223 47% 11%;
  --muted-foreground: 215.4 16.3% 56.9%;
  --accent: 216 34% 17%;
  --accent-foreground: 210 40% 98%;
  --popover: 224 71% 4%;
  --popover-foreground: 215 20.2% 65.1%;
  --border: 216 34% 17%;
  --input: 216 34% 17%;
  --card: 224 71% 4%;
  --card-foreground: 213 31% 91%;
  --primary: 210 40% 98%;
  --primary-foreground: 222.2 47.4% 1.2%;
  --secondary: 222.2 47.4% 11.2%;
  --secondary-foreground: 210 40% 98%;
  --destructive: 0 63% 31%;
  --destructive-foreground: 210 40% 98%;
  --ring: 216 34% 17%;
  --radius: 0.5rem;
}

body {
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  color: var(--foreground);
  transition: background-color 0.3s, color 0.3s;
}

#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--background);
  color: var(--foreground);
  transition: background-color 0.3s, color 0.3s;
}

.mode-switch {
  width: 200px;
  margin: 20px;
  padding: 10px 20px;
  cursor: pointer;
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: none;
  border-radius: 5px;
}

.mode-switch:hover {
  background-color: var(--primary-foreground);
  color: var(--primary);
}
</style>
