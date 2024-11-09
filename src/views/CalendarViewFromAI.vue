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
    <v-alert
      text="Esteu consultant les cites a l'agenda de la oficina de CAISS Barcelona, Sarrià. Carrer Vallvidrera, 27"
      title="Oficina CAISS"
      type="info"
      variant="tonal"
    ></v-alert>
    <v-expansion-panels class="pa-4" variant="popout">
      <v-expansion-panel v-for="(message, i) in messages" :key="i" hide-actions>
        <v-expansion-panel-title>
          <v-row align="center" class="spacer" no-gutters>
            <v-col cols="4" md="1" sm="2">
              <v-avatar size="36px">
                <v-img
                  v-if="message.avatar"
                  alt="Avatar"
                  src="https://avatars0.githubusercontent.com/u/9064066?v=4&s=460"
                ></v-img>
                <v-icon
                  v-else
                  :color="message.color"
                  :icon="message.icon"
                ></v-icon>
              </v-avatar>
            </v-col>

            <v-col class="hidden-xs-only text-left ms-2" md="3" sm="5">
              <strong v-html="message.name"></strong>
              <span v-if="message.total" class="text-grey">
                &nbsp;({{ message.total }})
              </span>
            </v-col>

            <v-col class="text-no-wrap text-left" cols="5" sm="3">
              <v-chip
                v-if="message.new"
                :color="`${message.color}-lighten-1`"
                class="ms-0 me-2"
                label
                small
              >
                {{ message.new }} new
              </v-chip>
              <strong v-html="message.title"></strong>
            </v-col>

            <v-col
              v-if="message.excerpt"
              class="text-medium-emphasis text-truncate hidden-sm-and-down"
            >
              &mdash;
              {{ message.excerpt }}
            </v-col>
          </v-row>
        </v-expansion-panel-title>

        <v-expansion-panel-text>
          <v-card-text v-text="expert"></v-card-text>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
  <v-container>
    <VDatePicker
      v-model="date"
      mode="date"
      class="custom-date-picker"
      :title="'Escull una data'"
      :header="'Escull una data'"
      @input="onDateSelected"
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

const date = ref(new Date(2024, 10, 14));
const time = ref(null);
const isComplete = ref(false);
const router = useRouter();

const messages = ref([
  {
    avatar: true,
    name: "Miquel Català",
    title: "Cita matí",
    excerpt: "Disponible Dijous 14",
    color: "blue",
  },
  {
    avatar: true,
    name: "Anna Roca",
    title: "Cita tarda",
    excerpt: "Disponible Dimecres 20",
    color: "blue",
  },
]);

const expert = "Tècnic administratiu. Sol·licitud permís paternitat.";

function goToWelcome() {
  router.push({ name: "Welcome" });
}

const timeOptions = Array.from({ length: (20 - 8 + 1) * 2 }, (_, i) => {
  const hours = String(Math.floor(i / 2) + 8).padStart(2, "0");
  const minutes = i % 2 === 0 ? "00" : "30";
  return `${hours}:${minutes}`;
});

function onDateSelected(selectedDate) {
  date.value = selectedDate;
  time.value = null;
  isComplete.value = false;
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
.oficina {
  font-weight: bold;
}

.v-sheet {
  width: 650px;
  height: 450px;
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
  margin-bottom: 80px;
}

.custom-date-picker {
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
</style>
