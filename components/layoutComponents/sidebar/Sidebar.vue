<template>
  <div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div class="scrollnavbar">

      <v-list class="pa-4">
        <!-- ---------------------------------------------- -->
        <!---Menu Loop -->
        <!-- ---------------------------------------------- -->
        <template v-for="(item, i) in categories" :key="i">
          <!-- ---------------------------------------------- -->
          <!---Single Item-->
          <!-- ---------------------------------------------- -->
          <v-list-item :to='"/categories/"+item.id' rounded="lg" class="mb-1">
           <div style="display: flex;justify-content: start">
             <div style="padding-right: 10px"><v-icon>mdi-folder</v-icon></div>
             <div v-text="item.name"></div>
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
      categories: []
    }
  },
  mounted() {
    axios.get(BASE_URL+`/api/category`).then(response => {
      this.categories = response.data
    }).catch(err => {
      console.log(err)
    });
  }
}
</script>