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
            Aquest assistent d'IA està dissenyat per resoldre dubtes comuns i
            oferir consells pràctics sobre la criança. Descobreix com pot
            ajudar-te!
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
              <v-avatar class="message-avatar">
                <v-icon color="#6C63FF">mdi-account</v-icon>
              </v-avatar>
              <v-card flat class="message-content">
                <v-card-text>{{ message.text }}</v-card-text>
              </v-card>
            </div>
          </template>
          <template v-else>
            <div class="icon-message">
              <v-avatar class="message-avatar">
                <v-icon color="#6C63FF">mdi-robot-excited</v-icon>
              </v-avatar>
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
          color="black"
          v-model="userMessage"
          label="Escribe una consulta"
          @keyup.enter="sendMessage"
          outlined
          dense
          full-width
        />
        <v-btn icon @click="sendMessage">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import { fetchSalamandraResponse } from "../api.js";

export default {
  data() {
    return {
      messages: [],
      userMessage: "",
    };
  },
  methods: {
    sendMessage() {
      if (!this.userMessage) return;
      this.messages.push({ text: this.userMessage, fromUser: true });
      setTimeout(() => {
        this.messages.push({ text: "Respuesta de la IA...", fromUser: false });
      }, 1000);
      this.userMessage = "";
    },
    goToWelcome() {
      this.$router.push({ name: "Welcome" });
    },
  },
  async getResponse() {
    try {
      this.response = "Cargando...";
      const result = await fetchSalamandraResponse(this.userInput);
      this.response = result;
    } catch (error) {
      this.response = "Error al obtener la respuesta";
    }
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
