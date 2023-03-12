<template>
  <div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar">

      <v-list class="pa-4">
        <div v-if="is_loading">
          <div class="skeleton skeleton-text ma-4" style="margin-top: 10px; height: 30px"></div>
          <div class="skeleton skeleton-text ma-4" style="margin-top: 10px; height: 30px"></div>
          <div class="skeleton skeleton-text ma-4" style="margin-top: 10px; height: 30px"></div>
          <div class="skeleton skeleton-text ma-4" style="margin-top: 10px; height: 30px"></div>
          <div class="skeleton skeleton-text ma-4" style="margin-top: 10px; height: 30px"></div>
          <div class="skeleton skeleton-text ma-4" style="margin-top: 10px; height: 30px"></div>
          <div class="skeleton skeleton-text ma-4" style="margin-top: 10px; height: 30px"></div>
        </div>
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-else v-for="(item, i) in categories" :key="i">
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <v-list-item rounded="lg" class="mb-1">
           <div style="display: flex;justify-content: start">
             <div style="padding-right: 10px"><v-icon>mdi-folder</v-icon></div>
             <NuxtLink :to='"/categories/"+item.id'><div v-text="item.name"></div></NuxtLink>
             <button @click="item.is_active=false" v-if="item.is_active" style="position: absolute; right: 0"><v-icon>mdi-chevron-up</v-icon></button>
             <button @click="item.is_active=true" v-else style="position: absolute; right: 0"><v-icon>mdi-chevron-down</v-icon></button>
           </div>
          </v-list-item>
          <v-list-item v-if="item.is_active" v-for="subcategory in item.subcategory" rounded="lg" class="mb-1">
            <div style="display: flex;justify-content: start">
              <div style="padding-right: 10px"><v-icon>mdi-minus</v-icon></div>
              <NuxtLink :to='"/subcategories/"+item.id'><div v-text="subcategory.name"></div></NuxtLink>
            </div>

          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>
<script>
import { ref, watch } from "vue";
import sidebarItems from "./sidebarItems";
import {BASE_URL} from "~/constants";
import axios from "axios";
import {useRouter} from "nuxt/app";

export default {
  name: "sidebar",
  data() {
    return {
      sidebarMenu: ref(sidebarItems),
      categories: [],
      is_loading: true
    }
  },
  mounted() {
    axios.get(BASE_URL+`/api/category`).then(response => {
      this.categories = response.data
      this.is_loading = false
    }).catch(err => {
      console.log(err)
    });
  },
  methods: {

  }
}
</script>
<style scoped>

.router-link-exact-active {
  color: rgb(24, 183, 55);
  font-weight: bold;
}

a{
  color: #000000;
  text-decoration: none!important;
  -webkit-box-shadow: none!important;
  box-shadow: none!important;
}
</style>