<template>
  <v-btn
    variant="outlined"
    prepend-icon="mdi-arrow-left"
    class="back-button"
    @click="goToWelcome"
  >
    Tornar
  </v-btn>
  <v-container>
    <VDatePicker v-model="date" mode="date" class="custom-date-picker" />
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const date = ref(new Date());
const router = useRouter();

function goToWelcome() {
  router.push({ name: "Welcome" });
}
</script>

<style scoped>
.v-sheet {
  width: 700px;
  height: 500px;
}
.back-button {
  margin-top: 20px;
  margin-left: 20px;
}

.v-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.custom-date-picker {
  --v-theme-primary: #4caf50;
  --v-theme-surface: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-date-picker .v-date-picker-title {
  font-size: 1.5rem;
  color: #333;
}

.custom-date-picker .v-btn.v-btn--selected {
  background-color: #ff5722 !important;
  color: white !important;
}

.custom-date-picker .v-date-picker-table .v-btn {
  color: #4caf50;
}

.custom-date-picker .v-date-picker-table .v-btn--disabled {
  color: #b0bec5;
}
</style>