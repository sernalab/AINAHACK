<template>
  <v-app-bar app color="teal-lighten-4">
    <img class="aina-img" src="../assets/ainahack.png" alt="" />
    <v-spacer></v-spacer>
    <div class="block-text-img">
      <span class="aina">AINA </span>
      <img class="sirt-img" src="../assets/sirt.png" alt="" />
    </div>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
};
</script>

<style scoped>
.block-text-img {
  display: flex;
  align-items: center;
}
.sirt-img {
  margin-right: 15px;
  max-height: 64px;
}

.aina {
  margin-top: 1px;
  font-size: 1.3rem;
}

.aina-img {
  margin-left: 15px;
  height: 40px;
}
</style>
