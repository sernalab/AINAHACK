<template>
  <v-container class="d-flex align-center justify-center">
    <v-card :loading="loading" title="Iniciar sessió" class="login-block">
      <v-card-text>
        <v-form>
          <v-text-field label="Nombre de usuario" outlined></v-text-field>
          <v-text-field
            label="Contraseña"
            type="password"
            outlined
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="justify-center">
        <button class="btn-grad" @click="login" :loading="loading">
          <span v-if="!loading">Iniciar Sesión</span>
          <span v-else>Redirigiendo...</span>
        </button>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    login() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.$router.push({ name: "Welcome" });
      }, 1500);
    },
  },
};
</script>

<style scoped>
.v-container {
  height: 100%;
}

.login-block {
  width: 300px;
}

.btn-grad {
  background-image: linear-gradient(
    to right,
    #02aab0 0%,
    #00cdac 51%,
    #02aab0 100%
  );
}
.btn-grad {
  min-width: 204.1px;
  min-height: 54px;
  margin: 10px;
  padding: 15px 45px;
  text-align: center;
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  border-radius: 10px;
  display: block;
}

.btn-grad:hover {
  background-position: right center; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>

