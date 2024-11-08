<template>
  <v-app>
    <Header />
    <v-main>
      <v-container>
        <v-list class="message-list">
          <v-list-item
            v-for="(message, index) in messages"
            :key="index"
            :class="message.fromUser ? 'user-message' : 'bot-message'"
          >
            <v-list-item-content
              :class="message.fromUser ? 'align-right' : 'align-left'"
            >
              <v-list-item-title>{{ message.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-container>
      <v-footer app color="teal-lighten-4" padless>
        <v-container>
          <v-row align="center" justify="space-between">
            <v-text-field
              color="black"
              v-model="userMessage"
              label="Escriu una consulta"
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
    </v-main>
    <AppFooter />
  </v-app>
</template>

<script>
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

      // Añadir el mensaje del usuario a la lista
      this.messages.push({ text: this.userMessage, fromUser: true });

      // Simulación de respuesta de IA
      setTimeout(() => {
        this.messages.push({ text: "Respuesta de la IA...", fromUser: false });
      }, 1000);

      this.userMessage = "";
    },
  },
};
</script>

<style scoped>
.message-list {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 60px;
}

.input-row {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  padding: 8px;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
}

.user-message {
  background-color: #d1c4e9;
  color: black;
  border-radius: 8px;
  padding: 8px;
  margin: 5px;
  max-width: 60%;
  align-self: flex-end;
}

.bot-message {
  background-color: #c5cae9;
  color: black;
  border-radius: 8px;
  padding: 8px;
  margin: 5px;
  max-width: 60%;
  align-self: flex-start;
}

.align-right {
  text-align: right;
}

.align-left {
  text-align: left;
}
</style>
