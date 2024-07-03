<template>
  <div>
    <button @click="changeLanguage('en')">English</button>
    <button @click="changeLanguage('ar')">عربي</button>
  </div>
</template>

<script>
export default {
  name: 'LanguageSwitcher',
  methods: {
    changeLanguage(lang) {
      this.$i18n.locale = lang;
      if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl'); // Set text direction to RTL for Arabic
      } else {
        document.documentElement.setAttribute('dir', 'ltr'); // Set text direction to LTR for English (or other languages)
      }
    },
  },
};
</script>

<style scoped>
button {
  width: 50%;
  margin: 0 5px;
  padding: 15px 20px;
  cursor: pointer;
  background-color: var(--card-background-color);
  color: var(--card-text-color);
  border: none;
  border-radius: 5px;
}

button:hover {
  background-color: var(--card-text-color);
  color: var(--card-background-color);
}
</style>

<style>
button {
  margin: 0 5px;
  padding: 25px 50px;
  cursor: pointer;
  background-color: var(--card-background-color);
  color: var(--card-text-color);
  border: none;
  border-radius: 5px;
}

button:hover {
    
  background-color: var(--card-text-color);
  color: var(--card-background-color);
}
</style>
