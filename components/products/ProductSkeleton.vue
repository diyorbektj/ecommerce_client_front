<template>
  <div class="wrapper">
    <v-card style="padding-bottom: 15px; border-radius: 10px" v-for="item in 4">
        <v-col>
          <div style="display: flex; justify-content: center">
            <div class="skeleton skeleton-img"></div>
          </div>
          <p class="skeleton skeleton-text" style="width: 60px"></p>
          <p class="skeleton skeleton-text w-25" style="width: 100px"></p>
          <p class="skeleton skeleton-text" style="width: 120px"></p>
        </v-col>
    </v-card>
  </div>
  <div style="margin-top: 30px"></div>
</template>

<script>
export default {
  name: "ProductSkeleton"
}
</script>

<style scoped>
.wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

</style>