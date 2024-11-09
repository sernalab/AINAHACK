<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center" class="card-container">
      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-card
          class="clickable-card"
          :elevation="2"
          hover
          ripple
          @click="navigateTo('Chat')"
        >
          <v-card-item>
            <div class="d-flex flex-column align-center">
              <div class="text-overline mb-4">Interactúa amb la nostra IA</div>
              <div class="image-container">
                <img
                  src="../assets/chatting.svg"
                  alt=""
                  class="responsive-image"
                />
              </div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>

      <v-col cols="12" md="6" class="d-flex justify-center">
        <v-card
          class="clickable-card"
          :elevation="2"
          hover
          ripple
          @click="navigateTo('Calendar')"
        >
          <v-card-item>
            <div class="d-flex flex-column align-center">
              <div class="text-overline mb-4">
                Ja saps el que vols? Troba cita!
              </div>
              <div class="image-container">
                <img
                  src="../assets/calendar.svg"
                  alt=""
                  class="responsive-image"
                />
              </div>
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
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
/* .fill-height {
  height: 100vh;
} */

img {
  width: 390px;
  height: 236px;
}

.v-row {
  flex-wrap: nowrap;
}

.card-container {
  gap: 30px;
}

.clickable-card {
  width: 100%;
  max-width: 600px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.clickable-card:hover {
  transform: scale(1.05);
}

@media (max-width: 960px) {
  .clickable-card {
    max-width: 90%;
  }

  .responsive-image {
    max-height: 200px;
  }
}
</style>