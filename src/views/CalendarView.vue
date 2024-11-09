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
    <v-row>
      <v-select
        v-model="selectedTramit"
        :items="tramits"
        label="Selecciona el tràmit"
        @change="onTramitSelected"
        class="mt-4 custom-community-select"
      />
    </v-row>
    <v-row>
      <v-select
        v-model="selectedCommunity"
        :items="communities"
        label="Selecciona la teva comunitat"
        @change="onCommunitySelected"
        class="mt-4 custom-community-select"
      />

      <v-select
        v-if="selectedCommunity"
        v-model="selectedCity"
        :items="cities[selectedCommunity]"
        label="Selecciona la ciutat"
        class="mt-4 custom-city-select"
      />
    </v-row>

    <v-row
      v-if="selectedTramit && selectedCommunity && selectedCity"
      class="mt-4"
    >
      <v-alert border="start" border-color="deep-purple-darken-1" elevation="2">
        Has seleccionat el següent tràmit:
        <span class="tramit-text"> {{ selectedTramit }}</span> a
        <span class="tramit-text">{{ selectedCity }}</span
        >,
        <span class="tramit-text">{{ selectedCommunity }}</span>
      </v-alert>
    </v-row>

    <VDatePicker
      v-model="date"
      mode="date"
      class="custom-date-picker"
      @input="onDateSelected"
      :model-modifiers="{ disabled: true }"
      :picker-date="pickerDate"
      :allowed-dates="allowedDates"
      :title="
        date ? `Data seleccionada: ${formatDate(date)}` : 'Escull una data'
      "
      :header="
        date ? `Data seleccionada: ${formatDate(date)}` : 'Escull una data'
      "
      :label="
        date && time
          ? `Seleccionado: ${date.toLocaleDateString()} ${time}`
          : 'Selecciona una fecha'
      "
    >
      <template v-slot:title>
        {{
          date ? `Data seleccionada: ${formatDate(date)}` : "Escull una data"
        }}
      </template>
    </VDatePicker>

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
      v-if="date"
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
const pickerDate = ref(new Date());
const selectedTramit = ref(null);
const selectedCommunity = ref(null);
const selectedCity = ref(null);

const tramits = ["Paternitat", "Maternitat", "Lactància"];

const communities = ["Barcelona", "Girona", "Lleida", "Tarragona"];
const cities = {
  Barcelona: ["Barcelona", "Hospitalet de Llobregat", "Badalona", "Terrassa"],
  Girona: ["Girona", "Figueres", "Blanes", "Olot"],
  Lleida: ["Lleida", "Balaguer", "Tàrrega", "Mollerussa"],
  Tarragona: ["Tarragona", "Reus", "Salou", "Cambrils"],
};

const disabledDays = Array.from({ length: 31 }, (_, i) => i + 1)
  .sort(() => Math.random() - 0.5)
  .slice(0, 5);

function formatDate(date) {
  if (!date) return "";
  return new Date(date).toLocaleDateString("ca", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function allowedDates(dateString) {
  const date = new Date(dateString);
  const dayOfMonth = date.getDate();
  return !disabledDays.includes(dayOfMonth);
}

function goToWelcome() {
  router.push({ name: "Welcome" });
}

function onDateSelected(selectedDate) {
  date.value = selectedDate;
  time.value = null;
  isComplete.value = false;
}

const timeOptions = Array.from({ length: (20 - 8 + 1) * 2 }, (_, i) => {
  const hours = String(Math.floor(i / 2) + 8).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

function onTramitSelected() {
  selectedCommunity.value = null;
  selectedCity.value = null;
}

function onCommunitySelected() {
  selectedCity.value = null;
}

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

.tramit-text {
  font-weight: bold;
}

.v-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 100px;
}

.v-row {
  width: 100%;
}

.custom-date-picker {
  --v-theme-primary: #6c63ff;
  --v-theme-surface: #f9f9f9;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Ocultar el título por defecto si es necesario */
.custom-date-picker :deep(.v-date-picker-header__value) {
  display: none;
}

.custom-date-picker :deep(.v-date-picker-month__day--disabled) {
  background-color: #f5f5f5 !important;
  opacity: 0.8;
  cursor: not-allowed;
}

.custom-date-picker :deep(.v-date-picker-month__day--disabled:hover) {
  background-color: #eeeeee !important;
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
