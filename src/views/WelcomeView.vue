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
        <v-card-item class="cards">
          <div>
            <div class="text-overline mb-1">Interactúa amb la nostra IA</div>
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
        <v-card-item class="cards">
          <div>
            <div class="text-overline mb-1">Troba cita al nostre calendari</div>
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
.cards {
  width: 600px;
}
img {
  height: 280px;
}

.wrapper-options {
  display: flex;
  align-items: center;
  gap: 30px;
}

@media screen and (min-width: 1024px) {
  .wrapper-options {
    margin-top: 150px;
  }
}

@media screen and (max-width: 1023px) {
  .wrapper-options {
    margin-top: 220px;
  }
}

.clickable-card {
  margin: 0 !important;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}
.clickable-card:hover {
  transform: scale(1.05);
}
</style>

