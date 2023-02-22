<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import Sidebar from "~~/components/layoutComponents/sidebar/Sidebar.vue";
import Header from "~~/components/layoutComponents/header/Header.vue";
import Footer from "~/components/layoutComponents/footer/Footer.vue";
const drawer = ref(true);
const innerW = window.innerWidth;
const { mdAndUp, mdAndDown } = useDisplay();
onMounted(() => {
  if (innerW < 950) {
    drawer.value = !drawer.value;
  }
});
</script>
<template>
  <div>
    <v-app>
      <!-- ---------------------------------------------- -->
      <!---Header -->
      <!-- ---------------------------------------------- -->
      <v-app-bar elevation="0" color="success">
        <v-app-bar-nav-icon @click="drawer = !drawer" />
        <v-toolbar-title style="font-size: 18px" class="font-weight-bold">
          <NuxtLink to="/">
          SEB.TJ
          </NuxtLink>
        </v-toolbar-title>
        <v-btn icon>
          <NuxtLink to="/search">
            <v-icon>mdi-magnify</v-icon>
          </NuxtLink>
        </v-btn>
        <v-btn icon>
<!--          <NuxtLink to="/favorites">-->
          <v-icon>mdi-heart</v-icon>
<!--          </NuxtLink>-->
        </v-btn>

        <!-- ---------------------------------------------- -->
        <!-- User Profile -->
        <!-- ---------------------------------------------- -->
        <Header />
      </v-app-bar>
      <v-main>
        <!-- ---------------------------------------------- -->
        <!---Sidebar -->
        <!-- ---------------------------------------------- -->
        <v-navigation-drawer
          left
          :permanent="mdAndUp"
          elevation="10"
          app
          :temporary="mdAndDown"
          v-model="drawer"
          expand-on-hover
        >
          <Sidebar />
        </v-navigation-drawer>

          <div style="background: #fff;padding-bottom: 10px">
            <slot />
          </div>
        <Footer />
      </v-main>
    </v-app>
  </div>
</template>

<style scoped>
a{
  color: #fff;
  text-decoration: none!important;
  -webkit-box-shadow: none!important;
  box-shadow: none!important;
}
</style>