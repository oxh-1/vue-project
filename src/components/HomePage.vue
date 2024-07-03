<template>
  <div class="container">
    <h1 class="mt-4 mb-4">{{ $t('welcome') }}</h1>
    <div class="row">
      <div class="col-md-6 mb-4" v-for="game in games" :key="game.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ $t(game.title) }}</h5>
            <p class="card-text">{{ $t('clickToPlay') }} {{ $t(game.title) }}.</p>
            <router-link :to="game.link" class="btn btn-primary">{{ $t('playGame') }}</router-link>
          </div>
        </div>
      </div>
    </div>
     <h1 class="mt-4 mb-4">{{ $t('welcome2') }}</h1>
    <div class="row">
      <div class="col-md-6 mb-4" v-for="page in pages" :key="page.id">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ $t(page.title) }}</h5>
            <p class="card-text">{{ $t('clickToView') }} {{ $t(page.title) }}.</p>
            <router-link :to="page.link" class="btn btn-primary">{{ $t('viewPage') }}</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      games: [
        { id: 1, title: 'guessNumberGame', link: '/G1' },
        { id: 2, title: 'game2', link: '/G2' },
        { id: 3, title: 'game3', link: '/G3' },
        { id: 4, title: 'game4', link: '/G4' },
      ],
      pages: [
        { id: 1, title: 'Page1', link: '/page1' },
        { id: 2, title: 'Page2', link: '/page2' },
        { id: 3, title: 'CombinedPage', link: '/combined' },
      ]
    };
  },
};
</script>

<style>
.container {
  width: 1200px; /* Adjust width as needed */
  margin: 0 auto;
  padding: 20px;
  background-color: var(--background);
  color: var(--foreground);
  transition: background-color 0.3s, color 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.col-md-6 {
  flex: 1 1 45%;
  max-width: 45%;
  box-sizing: border-box;
  padding: 10px;
}

.card {
  transition: transform 0.3s ease-in-out, background-color 0.3s, color 0.3s;
  background-color: var(--card);
  color: var(--card-foreground);
}

.card:hover {
  transform: scale(1.05);
}

.btn-primary {
  background-color: var(--primary);
  color: var(--primary-foreground);
  border: 1px solid var(--primary-foreground);
  transition: background-color 0.3s, color 0.3s;
}

.btn-primary:hover {
  background-color: var(--primary-foreground);
  color: var(--primary);
}
</style>
