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
    <VDatePicker
      v-model="date"
      mode="date"
      class="custom-date-picker"
      @input="onDateSelected"
      :label="
        date && time
          ? `Seleccionado: ${date.toLocaleDateString()} ${time}`
          : 'Selecciona una fecha'
      "
    />

    <v-select
      v-if="date"
      v-model="time"
      :items="timeOptions"
      label="Selecciona la hora"
      placeholder="HH:mm"
      class="mt-4 custom-time-select"
      @change="onTimeSelected"
    />

    <v-btn
      @click="toggleComplete"
      :class="{ 'completed-button': isComplete }"
      class="mt-4"
    >
      {{ isComplete ? "Cita guardada" : "Guardar Data i Hora" }}
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const date = ref(null);
const time = ref(null);
const isComplete = ref(false);
const router = useRouter();

function goToWelcome() {
  router.push({ name: "Welcome" });
}

function onDateSelected(selectedDate) {
  date.value = selectedDate;
  time.value = null;
  isComplete.value = false;
}

const timeOptions = Array.from({ length: 24 * 2 }, (_, i) => {
  const hours = String(Math.floor(i / 2)).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

function onTimeSelected() {
  isComplete.value = false;
}

function toggleComplete() {
  if (date.value && time.value) {
    isComplete.value = !isComplete.value;
  }
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
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.custom-date-picker {
  --v-theme-primary: #6c63ff;
  --v-theme-surface: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.custom-time-select {
  width: 150px;
}

.completed-button {
  background-color: #6c63ff;
  color: white;
}

.custom-date-picker .v-date-picker-title {
  font-size: 1.5rem;
  color: #333;
}

.custom-date-picker .v-btn.v-btn--selected {
  background-color: #ff5722 !important;
  color: white !important;
}
</style>
