<template>
  <v-container class="mb-16">
    <div style="font-size: 24px; font-weight: bold;">Избранное</div>
  </v-container>
  <div v-for="n in 15">
    <v-container>
      <div style="display: flex; justify-content: space-between">
        <div class="pr-2">          <img style="border-radius: 5px;" width="100" height="100" src="https://img.joomcdn.net/3a471d818df6d088b956251e491cf6f707c9e3c0_400_400.jpeg" alt=""></div>
        <div>
          <p style="font-size: 14px">DIMANAF 2022 Весенние джинсы Длинные брюки Женская одежда</p>

        </div>
      </div>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script>
export default {
  name: "favorites"
}
</script>

<style scoped>

</style>