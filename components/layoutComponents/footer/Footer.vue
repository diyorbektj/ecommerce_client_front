<template>
  <div>
    <v-bottom-navigation background-color="green" grow elevation="0.1">
      <v-btn value="recent">
        <v-icon>mdi-home</v-icon>

        Главная
      </v-btn>

      <v-btn @click="dialog = !dialog" value="favorites">
        <v-tab>
          <v-badge
              color="green"
              :content="store.count"
          >
            <v-icon>mdi-cart</v-icon>

          </v-badge>
        </v-tab>
        Корзина
      </v-btn>

      <v-btn value="nearby">
        <v-icon>mdi-account</v-icon>

        Акаунт
      </v-btn>
    </v-bottom-navigation>
  </div>
  <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
      scrollable
  >
    <v-card tile>
      <form @submit.prevent="BuyProducts">
      <v-toolbar
          flat
          dark
          color="success"
      >
        <v-btn
            icon
            dark
            @click="dialog = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Корзина</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
        </v-toolbar-items>
      </v-toolbar>
      <div v-if="step === 1" v-for="item in store.contents">
        <v-container>
          <div style="display: flex; justify-content: space-between">
            <div class="pr-2">          <img style="border-radius: 5px;" width="80" height="80" :src="'http://127.0.0.1:8000'+item.product_image" alt=""></div>
            <v-col style="padding: 10px; margin-top: 4px; margin-bottom: 4px">
              <p style="font-size: 14px; padding: 5px">{{ item.product_name }}
                <span class="ml-3 pa-1" style="background: #e7e7e7; border-radius: 3px" v-for="attribute in item.attributes">{{attribute}}</span>
              </p>
              <p>
                <button @click="Decrement(item.id_hash)" style="padding: 2px 10px; background: #ffffff; border: 1px solid #c6c6c6; border-radius: 9999999px">-</button>
                <input v-model="item.quantity" type="number" style="width: 40px; height: 32px; border: 1px solid #c6c6c6; border-radius: 15px; padding-left: 8px;">
                <button @click="Increment(item.id_hash)" style="padding: 2px 10px; background: #ffffff; border: 1px solid #c6c6c6; border-radius: 9999999px">+</button>
                <span class="pl-8">{{ item.price }} с.</span>
<!--                <span>-->
<!--                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 15px; color: #ff0000">-->
<!--                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />-->
<!--                  </svg>-->
<!--                </span>-->
              </p>
            </v-col>
          </div>
        </v-container>
        <v-divider> </v-divider>
      </div>
      <div v-if="step === 2">
        <v-container>
          <div style="margin-top: 10px; margin-bottom: 10px; font-size: 18px">Введите адрес:</div>
          <div>
            <v-text-field required v-model="address.fullname" label="Имя:"></v-text-field>
            <v-text-field required aria-required="true" v-model="address.city" label="Город:"></v-text-field>
            <v-text-field required aria-required="true" v-model="address.street" label="Адресс:"></v-text-field>
            <v-text-field required aria-required="true" v-model="address.phone_number" label="Номер телефон:" ></v-text-field>
          </div>
        </v-container>
      </div>
      <v-bottom-navigation style="height: auto; width: 100%">
        <v-col>
          <div style="display:flex; justify-content: space-between; font-size: 16px; padding-bottom: 8px">
            <p>Total price</p>
            <p>{{ store.total }} сомони</p>
          </div>
          <div style="display:flex; align-items: center">
            <button type="submit" style="padding: 8px; background: rgb(5,177,135); color: #fff; font-size: 16px">Купить</button>
            <button v-if="step===2" @click="step=1" style="margin: 10px; font-size: 16px">Назад</button>
            <button v-if="step===1" @click.prevent="ClearBasket" style="margin: 6px">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" style="width: 25px; ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </v-col>
      </v-bottom-navigation>
      <div style="flex: 1 1 auto;"></div>
      <div style="margin-bottom: 100px"></div>
    </form>
    </v-card>
  </v-dialog>
  <v-snackbar
      v-model="snackbar"
  >
    Ваш заказ приниять

    <template v-slot:actions>
      <v-btn
          color="green"
          variant="text"
          @click="snackbar = false"
      >
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import {useBasketStore} from "~/stores";
import CryptoJS from "crypto-js";
import {BASE_URL} from "~/constants";
import axios from "axios";

export default {
  name: "Footer",
  data(){
    return{
      dialog: false,
      count: 1,
      step: 1,
      address: {},
      snackbar: false
    }
  },
  methods: {
    BuyProducts(){
      if(this.step === 1){
        const store = useBasketStore()
        if(store.contents.length >0){
          this.step += 1
        }
      }else{
        const store = useBasketStore()
        axios.post(BASE_URL+"/api/order/store?guid="+localStorage.getItem('guid'), {products: store.contents, total_price: this.store.total, fullname: this.address.fullname, phone_number: this.address.phone_number, city: this.address.city, street: this.address.street}).then(response => {
          store.contents = []
          this.snackbar=true
          this.step=1
          this.dialog = false
        })
      }
    },
    Increment(hash){
      const someStore = useBasketStore()
      someStore.Increment(hash)
    },
    Decrement(hash){
      const someStore = useBasketStore()
      someStore.Decrement(hash)
    },
    ClearBasket(){
      const store = useBasketStore()
      store.ClearBasket()
    }
  },
  setup(){

    const store = useBasketStore()
    return { store }
  },
  mounted() {
    const basket = useBasketStore()
    basket.Basket()
  },
}
</script>

<style scoped>

</style>