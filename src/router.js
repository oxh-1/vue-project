import { createRouter, createWebHistory } from 'vue-router';
import HomePage from './components/HomePage.vue';
import GuessNumberGame from './components/G1.vue';
import MemoryGame from './components/G2.vue';
import Game3 from './components/G3.vue';
import Game4 from './components/G4.vue';
import Page1 from './components/Page1.vue';
import Page2 from './components/Page2.vue';
import CombinedPage from './components/CombinedPage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/G1', component: GuessNumberGame },
  { path: '/G2', component: MemoryGame },
  { path: '/G3', component: Game3 },
  { path: '/G4', component: Game4 },
  {path:'/page1',component : Page1},
{path:'/page2',component : Page2},
{path:'/combined',component : CombinedPage},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
