<script setup lang="ts">
import { computed, ref } from "vue";

const counter = ref(0);
const doubleCount = computed(() => counter.value * 2);
</script>

<template>
  <div class="counter">
    <h3>Counter: {{ counter }}</h3>
    <p>Double: {{ doubleCount }}</p>
    <button @click="counter++">+1</button>
  </div>
</template>

<style scoped>
.counter {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  text-align: center;
}

button {
  padding: 0.5rem 1.5rem;
  margin-top: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  background: var(--color-background-soft);
  color: var(--color-text);
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background: var(--color-border);
}
</style>
