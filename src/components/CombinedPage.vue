<template>
  <div class="combined-page">
    <h1 class="title">{{ $t('CombinedPage') }}</h1>
    <div class="page-container">
      <Page1 />
      <Page2 />
    </div>
  </div>
</template>

<script setup lang="ts">
import Page1 from '@/components/Page1.vue';
import Page2 from '@/components/Page2.vue';
</script>

<style scoped>
.combined-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f8f9fa;
  color: #333;
  min-height: calc(90vh - 1000px); /* Decreased container height by 100px */
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: #007bff;
}

.page-container {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
}

.page-container > * {
  flex: 1 1 calc(50% - 100px); /* Increased width by 20px on both sides */
  box-sizing: border-box;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  height: 200px; /* Adjusted height, decreased by 100px */
}

.page-container > *:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
  .page-container > * {
    flex: 1 1 100%;
    height: auto; /* Adjust height for mobile view */
  }
}
</style>
