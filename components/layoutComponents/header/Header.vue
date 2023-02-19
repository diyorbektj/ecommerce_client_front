<script setup>
const userprofile = ref([
  {
    title: "My Profile",
    desc: "Account Settings",
  },
  {
    title: "My Inbox",
    desc: "Messages & Emails",
  },
  {
    title: "My Tasks",
    desc: "To-do and Daily Tasks",
  },
]);
</script>

<template>
  <v-menu anchor="bottom end" origin="auto" min-width="200">
    <template v-slot:activator="{ props }">
      <v-btn
        v-bind="props"
        class=""
        elevation="0.0"
        plain
        :ripple="false"
      >
          <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>

    <v-list class="pa-3" elevation="10" rounded="lg">
      <v-list-item
        class="pa-3 mb-2"
        v-for="(item, i) in userprofile"
        :key="i"
        :value="item"
        :title="item.title"
        :subtitle="item.desc"
        rounded="lg"
      >
      </v-list-item>
      <v-btn  block color="success" variant="tonal" class="mt-4 py-4"
        >Logout</v-btn
      >
    </v-list>
  </v-menu>
</template>
<style>
.v-btn:hover:before {
  background-color: transparent;
}
</style>

<script>
import axios from "axios";
import {BASE_URL} from "~/constants";
import {useRouter} from "nuxt/app";

export default {
  name: "header",
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>