<template >
 <div v-if="token === null">
   <v-card>
     <img src="/images/banner.png" class="w-100" />
     <div class="d-flex justify-center mt-n15">
       <v-avatar size="100">
         <img src="/images/users/img.png" width="100" alt="user" />
       </v-avatar>
     </div>
     <v-card-text>
       <div class="p-4 text-center justify-center">
         <h2 class="mb-0 mt-4 font-weight-regular">Гость</h2>
         <!--        <small>Web Designer &amp; Developer</small><br />-->
         <v-btn @click="ToLogin" rounded color="primary" class="mt-4 px-7 mx-auto">Авторизация</v-btn>
         <v-row class="mt-6 pb-4">
           <v-col cols="4">
             <h2 class="mb-0">0</h2>
             <small class>Заказы</small>
           </v-col>
           <v-col cols="4">
             <h2 class="mb-0">0</h2>
             <small class>Доставлено</small>
           </v-col>
           <v-col cols="4">
             <h2 class="mb-0">0</h2>
             <small class>Ожидание</small>
           </v-col>
         </v-row>
       </div>
     </v-card-text>
   </v-card>
   <v-card class="mt-4 mb-4">
     <div class="pa-2" style="color: #7b7b7b">
       <div class="pa-4"><v-icon>mdi-archive</v-icon>Мои заказы</div>
       <div class="pa-4"><v-icon>mdi-map-marker</v-icon>Адрес доставка</div>
       <div class="pa-4"><v-icon>mdi-archive</v-icon>Мои заказы</div>
       <div class="pa-4"><v-icon>mdi-archive</v-icon>Мои заказы</div>
       <div class="pa-4"><v-icon>mdi-logout</v-icon>Выход</div>
     </div>
   </v-card>
 </div>
  <div v-else>
    <v-card>
      <img src="/images/banner.png" class="w-100" />
      <div class="d-flex justify-center mt-n15">
        <v-avatar size="100">
          <img src="/images/users/img.png" width="100" alt="user" />
        </v-avatar>
      </div>
      <v-card-text>
        <div class="p-4 text-center justify-center">
          <h2 class="mb-0 mt-4 font-weight-regular">{{ user.first_name }} {{ user.last_name  }}</h2>
          <!--        <small>Web Designer &amp; Developer</small><br />-->
          <!--        <v-btn @click="ToLogin" rounded color="primary" class="mt-4 px-7 mx-auto">Авторизация</v-btn>-->
          <v-row class="mt-6 pb-4">
            <v-col cols="4">
              <h2 class="mb-0">0</h2>
              <small class>Заказы</small>
            </v-col>
            <v-col cols="4">
              <h2 class="mb-0">0</h2>
              <small class>Доставлено</small>
            </v-col>
            <v-col cols="4">
              <h2 class="mb-0">0</h2>
              <small class>Ожидание</small>
            </v-col>
          </v-row>
        </div>
      </v-card-text>
    </v-card>
    <v-card class="mt-4 mb-4">
      <div class="pa-2" style="color: #7b7b7b">
        <div class="pa-4"><v-icon>mdi-archive</v-icon>Мои заказы</div>
        <div class="pa-4"><v-icon>mdi-map-marker</v-icon>Адрес доставка</div>
        <div class="pa-4"><v-icon>mdi-archive</v-icon>Мои заказы</div>
        <div class="pa-4"><v-icon>mdi-archive</v-icon>Мои заказы</div>
        <div class="pa-4"><v-icon>mdi-logout</v-icon>Выход</div>
      </div>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
import {BASE_URL} from "../../constants";

export default {
  name: "Profile",
  data(){
    return{
      token: localStorage.getItem('token') ?? null,
      user: {}
    }
  },
  mounted() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
    axios.get(BASE_URL+"/api/user").then(response => {
      this.user = response.data
    }).catch(err => {
      console.log(err)
    })
  },
  methods: {
    ToLogin(){
      const router = useRouter();
      router.push({ path: "/users/auth/login" });
    },
  }
}
</script>

<style scoped>

</style>