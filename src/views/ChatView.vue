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
        <v-card-title>Benvingut a </v-card-title>
        <v-card-text> texto </v-card-text>
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
                <v-icon>mdi-account</v-icon>
              </v-avatar>
              <v-card flat class="message-content">
                <v-card-text>{{ message.text }}</v-card-text>
              </v-card>
            </div>
          </template>
          <template v-else>
            <div class="icon-message">
              <v-avatar class="message-avatar">
                <v-icon>mdi-robot-excited</v-icon>
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
import axios from "axios";

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
  async FETCHING() {
    try {
      const response = await axios.post("https://api.tu-ia.com/mensaje", {
        message: this.userMessage,
      });
    } catch (error) {
      console.error("Error al obtener la respuesta de la API:", error);
    }
    this.userMessage = "";
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
  margin-top: 230px;
}

.welcome-block {
  width: 50%;
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
  background-color: #90a4ae;
  color: black;
  text-align: right;
}

.from-bot .message-content {
  background-color: #cfd8dc;
  color: black;
  text-align: left;
}
</style>
