<template>
  <v-container class="mb-16">
    <div style="font-size: 24px; font-weight: bold;">Избранное</div>
  </v-container>
  <div v-for="item in favorites">
    <v-container>
      <div style="display: flex; justify-content: space-between">
        <div class="pr-2">          <img style="border-radius: 5px;" width="100" height="100" :src="item.product_image" alt=""></div>
        <div>
          <p style="font-size: 14px">{{ item.product_name }}</p>

        </div>
      </div>
    </v-container>
    <v-divider></v-divider>
  </div>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../constants";

const route = useRoute()

export default {
  name: "favorites",
  data(){
    return {
      favorites: []
    }
  },
  mounted() {
    axios.get(BASE_URL+`/api/favorite/get`, {params: {guid: localStorage.getItem('guid')}}).then(response => {
      this.favorites = response.data
    }).catch(err => {
      console.log(err);
    });
  }
}
</script>

<style scoped>

</style>