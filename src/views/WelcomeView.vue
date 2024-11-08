<template>
  <v-container>
    <v-col cols="12" class="wrapper-options">
      <v-card
        class="mx-auto clickable-card"
        :elevation="2"
        hover
        ripple
        @click="navigateTo('Chat')"
      >
        <v-card-item>
          <div>
            <div class="text-overline mb-1">Interactúa amb la nostre IA</div>
            <div class="text-caption">
              <img src="../assets/chatting.svg" alt="" />
            </div>
          </div>
        </v-card-item>
      </v-card>
      <v-card
        class="mx-auto clickable-card"
        :elevation="2"
        hover
        ripple
        @click="navigateTo('Calendar')"
      >
        <v-card-item>
          <div>
            <div class="text-overline mb-1">
              Troba cita en el nostre calendari
            </div>
            <div class="text-caption">
              <img src="../assets/calendar.svg" alt="" />
            </div>
          </div>
        </v-card-item>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
export default {
  methods: {
    navigateTo(routeName) {
      this.$router.push({ name: routeName });
    },
  },
};
</script>

<style scoped>
img {
  height: 220px;
}
.wrapper-options {
  margin-top: 230px;
  display: flex;
  justify-content: space-between;
  align-content: center;
  gap: 30px;
}

.clickable-card {
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.clickable-card:hover {
  transform: scale(1.05);
}
</style>

