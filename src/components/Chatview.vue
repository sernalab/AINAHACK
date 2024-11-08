<template>
  <v-container>
    <!-- Área de mensajes -->
    <v-list>
      <v-list-item
        v-for="(message, index) in messages"
        :key="index"
        :class="{
          'user-message': message.fromUser,
          'bot-message': !message.fromUser,
        }"
      >
        <v-list-item-content>
          <v-text-field label="Label" variant="solo-inverted">{{
            message.text
          }}</v-text-field>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <!-- Campo de entrada -->
    <v-row align="center" justify="space-between">
      <v-text-field
        v-model="userMessage"
        label="Escribe un mensaje"
        @keyup.enter="sendMessage"
      />
      <v-btn icon @click="sendMessage">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-row>
  </v-container>
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

      this.messages.push({ text: this.userMessage, fromUser: true });

      setTimeout(() => {
        this.messages.push({ text: "Respuesta de la IA...", fromUser: false });
      }, 1000);

      this.userMessage = "";
    },
  },
};
</script>

<style>
.user-message {
  background-color: #d1c4e9;
  color: black;
  border-radius: 8px;
  padding: 8px;
  margin: 5px;
}

.bot-message {
  background-color: #c5cae9;
  color: black;
  border-radius: 8px;
  padding: 8px;
  margin: 5px;
}
</style>
