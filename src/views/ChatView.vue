<template>
  <v-btn
    variant="outlined"
    prepend-icon="mdi-arrow-left"
    class="back-button"
    @click="goToWelcome()"
  >
    Tornar
  </v-btn>
  <template v-if="messages.length === 0">
    <div class="wrapper-chatview">
      <v-card class="welcome-block">
        <v-card-title
          >Benvingut a l'assistent d'ajuda per a pares i mares</v-card-title
        >
        <v-card-text>
          <p class="intro-text">
            Aquest assistent d'IA (<span class="name-ai">CivitasIA</span>) està
            dissenyat per resoldre dubtes comuns i oferir consells pràctics
            sobre la criança. Descobreix com pot ajudar-te!
          </p>
          <ul class="feature-list">
            <li>
              <span class="feature-title">Dies de paternitat i permisos: </span>
              <span class="feature-description"
                >Informa't sobre els permisos disponibles per a pares i
                mares.</span
              >
            </li>
            <li>
              <span class="feature-title">Consells per a la lactància: </span>
              <span class="feature-description"
                >Recomanacions i bones pràctiques per a una lactància
                saludable.</span
              >
            </li>
          </ul>
        </v-card-text>
      </v-card>
    </div>
  </template>
  <template v-else>
    <v-container class="wrapper">
      <div class="message-list">
        <div
          v-for="(message, index) in messages"
          :key="index"
          :class="[
            'message-container',
            message.fromUser ? 'from-user' : 'from-bot',
          ]"
        >
          <template v-if="message.fromUser">
            <div class="icon-message-user">
              <div class="message-avatar">
                <span icon @click="goToCalendarAppointment">
                  <v-icon color="#6C63FF">mdi-account</v-icon>
                </span>
              </div>
              <v-card flat class="message-content">
                <v-card-text>{{ message.text }}</v-card-text>
              </v-card>
            </div>
          </template>
          <template v-else>
            <div class="icon-message">
              <div class="message-avatar">
                <!-- <v-icon color="#6C63FF">mdi-robot-excited</v-icon> -->
                <img class="civitas" src="../assets/xatCivitasAI.png" alt="" />
              </div>
              <v-card flat class="message-content">
                <v-card-text>{{ message.text }}</v-card-text>
              </v-card>
            </div>
          </template>
        </div>
      </div>
    </v-container>
  </template>
  <v-footer app color="teal-lighten-4" padless>
    <v-container>
      <v-row align="center" justify="space-between">
        <v-text-field
          class="input-chat"
          color="black"
          v-model="userMessage"
          label="Interactúa amb CivitasIA"
          @keyup.enter="sendMessage"
          outlined
          dense
          full-width
          hide-details
        />
        <v-btn icon @click="sendMessage">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { getSalamandraResponse } from "../api";

export default {
  data() {
    return {
      messages: [],
      userMessage: "",
      isLoading: false,
    };
  },
  methods: {
    async sendMessage() {
      if (!this.userMessage.trim()) return;

      this.messages.push({
        text: this.userMessage,
        fromUser: true,
      });

      const messageToSend = this.userMessage;
      this.userMessage = "";
      this.isLoading = true;

      try {
        const response = await getSalamandraResponse(messageToSend);

        this.messages.push({
          text: response,
          fromUser: false,
        });
      } catch (error) {
        console.error("Error:", error);
        this.messages.push({
          text: "Ho sento, hi ha hagut un error en processar la teva consulta. Si us plau, torna-ho a intentar.",
          fromUser: false,
        });
      } finally {
        this.isLoading = false;
      }
    },

    goToWelcome() {
      this.$router.push({ name: "Welcome" });
    },
    goToCalendarAppointment() {
      this.$router.push({ name: "appointment" });
    },
  },
};
</script>

<style scoped>
/* .v-main {
  background-color: #2b5876;
} */

/* .v-list {
  background-color: #2b5876;
} */

.input-chat {
  background-color: #ecebff;
}

.v-row {
  gap: 30px;
}

.v-icon::before {
  font-size: 33px;
}

.civitas {
  height: 40px;
}
.name-ai {
  font-size: 1rem;
  color: #6c63ff;
  font-weight: bold;
}

.back-button {
  margin-top: 20px;
  margin-left: 20px;
}

.wrapper-chatview {
  display: flex;
  justify-content: center;
  margin-top: 120px;
}

.welcome-block {
  width: 50%;
  padding: 20px;
}

.message-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 60px;
}

.message-container {
  display: flex;
  align-items: center;
  margin: 8px 0;
}

.icon-message {
  display: flex;
  align-items: center;
}

.icon-message-user {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.from-user {
  justify-content: flex-end;
}

.from-bot {
  justify-content: flex-start;
}

.message-avatar {
  margin: 0 8px;
}

.message-content {
  padding: 8px;
}

.from-user .message-content {
  background-color: #b0bec5;
  color: black;
  text-align: right;
}

.from-bot .message-content {
  background-color: #cfd8dc;
  color: black;
  text-align: left;
}

.feature-list li {
  margin: 16px 0;
}

.feature-title {
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}

.feature-description {
  font-size: 0.9rem;
  color: #666;
}
</style>
