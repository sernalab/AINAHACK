<template>
  <v-app-bar app color="teal-lighten-4">
    <img class="aina-img" src="../assets/ainahack.png" alt="" />
    <v-spacer></v-spacer>
    <img class="sirt-img" src="../assets/sirt.png" alt="" />
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.sirt-img {
  margin-right: 15px;
  height: 80px;
}

.aina-img {
  margin-left: 15px;
  height: 40px;
}
</style>
